import React, { memo, MutableRefObject, useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs';
import { MdRemoveCircle } from 'react-icons/md';
import { useAccountStore } from '../../../../context/AccountProvider';
import { CreateTicketCFT, CREATE_EVENT_CF } from '../../../../api/mutations/createEventCF';
import LoadingField from '../../../LoadingField/LoadingField';
import { useMutation } from '@apollo/client';
interface Props {
  setComplete: React.Dispatch<React.SetStateAction<boolean>>
  formData: MutableRefObject<CreateTicketCFT>
}

const CCFEStep4: React.FC<Props> = ({ setComplete, formData }: Props): React.ReactElement => {
  const userData = useAccountStore()
  const [loading, setLoading] = useState(false)

  const [activeApproval, setActiveApproval] = useState<boolean>(false);
  const [approvals, setApprovals] = useState<string[]>([userData.store.account.user]);
  const [approvalInput, setApprovalInput] = useState<string>('');
  const [createEventcf] = useMutation(CREATE_EVENT_CF);

  const handleAddApproval = (): void => {
    approvalInput && setApprovals([...approvals, approvalInput]);
    setApprovalInput('');
  }

  const handleSubmit = (): void => {
    setLoading(true)
    formData.current.owner = userData.store.account.user
    formData.current.approver = approvals

    createEventcf({
      variables: {
        ...formData.current
      },
      onCompleted: () => {
        setLoading(false);
        setComplete(true);
      },
      onError: () => {
        alert("Something went wrong")
        setLoading(false);
      },
    })
  }

  return (
    <>
      <article>
        <div className='issuing-label'>
          <label>Ticket Provider *</label>
        </div>
        <div className='issuing-input text-gray-400 mt-2'>
          <input
            type="input" readOnly
            value={userData.store.account.user}
          />
        </div>
      </article>
      <article>
        <div className='issuing-label mt-6 flex items-center justify-between'>
          <label htmlFor="issuing-ticket-approval-input">Ticket Approval(s)</label>
          {activeApproval || (
            <button className='add-approval' onClick={() => setActiveApproval(true)}>
              <i className='text-2xl'><BsPlusCircleFill /></i>
            </button>
          )}
        </div>

        {activeApproval && (
          <>
            <div className='issuing-input mt-2'>
              <input
                type="input" id="issuing-ticket-approval-input"
                placeholder='Add ticket approval'
                value={approvalInput}
                onChange={e => setApprovalInput(e.target.value)}
              />
              <button
                className={`add-approval mr-6 ${approvalInput ? 'enabled' : 'disabled'}`}
                onClick={handleAddApproval}>
                <i className='text-2xl'><BsPlusCircleFill /></i>
              </button>
            </div>
            <div>
              {approvals.length > 0 && approvals.map((approval, index) => (
                <div key={index} className='flex items-center mt-4 w-3/4'>
                  <div className="flex-1 px-6 bg-subBgColor rounded-3xl ">
                    <p className='py-2 text-sm font-semibold text-primaryColor'>{approval}</p>
                  </div>
                  {approval !== userData.store.account.user &&
                    <button
                      className='ml-2 opacity-60 hover:opacity-100'
                      onClick={() => setApprovals(approvals => approvals.filter(checkApproval => checkApproval !== approval))}
                    >
                      <i className='text-3xl text-gray-500'><MdRemoveCircle /></i>
                    </button>
                  }
                </div>
              ))}
            </div>
          </>
        )}
      </article>
      <article className='footer-full-w-btn w-full mt-10 mb-32'>
        <button className={`primary-btn`} onClick={handleSubmit}>
          {
            loading ?
              <LoadingField />
              :
              'OK'
          }
        </button>
      </article>
    </>
  )
}

export default memo(CCFEStep4)