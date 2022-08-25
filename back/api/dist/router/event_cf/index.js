"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("router");
const router = Router();
const moment = require("moment-timezone");
const joincf = require("../../control/event_cf/update_eventcf");
const eventcf = require("../../control/event_cf/get_eventcf");
const close_event = require("../../control/event_cf/close_eventcf");
const eventcf_now = require("../../control/event_cf/eventcf_now");
const create_events = require("../../control/event/create_event");
const account = require("../../control/account/get_account");
const create_ticket = require("../../control/ticket/create_ticket");
const create_participant = require("../../control/event_cf/create_participant");
const getParticipant = require("../../control/event_cf/get_Paricipant");
const update_participant = require("../../control/event_cf/update_participant");
const update = require("../../control/account/update_account");
const create_eventcf = require("../../control/event_cf/create_eventcf");
const start_eventcf_now = require("../../control/event_cf/event_start_now");
//tạm thời sau chuyển sang blockchain
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { approver, catogory_id, end_date, end_date_cf, estimate_price, event_info, event_name, image_event, image_eventcf, image_ticket, location, owner, start_date, start_date_cf, supply, total_raise, ticket_class, price_ticket, event_name_cf, } = req.body.input;
    // run some business logic
    // execute the Hasura operation
    if (supply >= total_raise) {
        const { data, errors } = yield create_eventcf({
            approver,
            catogory_id,
            end_date,
            end_date_cf,
            estimate_price,
            event_info,
            event_name,
            image_event,
            image_eventcf,
            image_ticket,
            location,
            owner,
            start_date,
            start_date_cf,
            supply,
            total_raise,
            ticket_class,
            price_ticket,
            event_name_cf,
        });
        if (errors) {
            return res.status(400).json(errors[0]);
        }
        // success
        return res.json(Object.assign({}, data.insert_EventCF));
    }
    else {
        return res.status(400).send("Số lượng vé phải lớn hơn điều kiện tạo event");
    }
    // if Hasura operation errors, then throw error
}));
//Điều kiện crowfunding and trigger
router.post("/crownfunding", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.event.data.new;
    console.log(data);
    console.log("vào chưua");
    let dateGet = moment(new Date()).format("YYYY-MM-DD HH:mm");
    try {
        console.log("vào chưua2", data.total_raise * data.estimate_price);
        if (data.current_raise < data.total_raise) {
            const input_event = {
                end_date: data.end_date,
                image: data.image_event,
                owner: data.owner,
                localtion: data.location,
                name: data.event_name,
                start_date: data.start_date,
                ticket_issued: data.supply,
                ticket_sold: data.total_raise,
                total_proceed: data.total_raise * data.estimate_price,
                eventcf: data.id,
            };
            console.log("vào chưua3", input_event);
            const close = yield close_event({ id: data.id, status: 3 }); // close event trạng thái thành công gọi vốn
            const create_event = yield create_events(input_event, data.catogory_id); // tao event
            const participant = yield getParticipant({ event_cf_id: data.id }); // lấy danh sách tham gia của cf
            console.log(participant);
            console.log("test12345", create_event.data.insert_Event.returning[0].id);
            let arr = [];
            ///////////////////////////////////////////////////////////////
            //Tạo ticket cho những người tham gia CF
            for (let i = 0; i < participant.data.Participant.length; i++) {
                for (let j = 0; j < participant.data.Participant[i].amount; j++) {
                    const input_ticket = {
                        input: {
                            create_at: dateGet,
                            user_id: participant.data.Participant[i].user_id,
                            type: 2,
                            status: 1,
                            TicketToken: {
                                data: {
                                    event: create_event.data.insert_Event.returning[0].id,
                                    image_link: data.image_event,
                                    owner_address: participant.data.Participant[i].UserNonce.UserWallet // địa chỉ ví của người tham gia
                                        .wallet_address,
                                    ticket_type: 1,
                                    usable: 1,
                                    approver: data.approver,
                                    status: 1,
                                    price: data.estimate_price,
                                    class_ticket: data.ticket_class,
                                },
                            },
                        },
                    };
                    arr.push(input_ticket.input); // push từng danh sách người tham gia vào 1 mảng
                }
                console.log("nou2", participant.data.Participant[i].user_id);
                console.log("nou", participant.data.Participant[i].UserNonce.ticket_bought +
                    participant.data.Participant[i].amount);
                const update_data = yield update({
                    id: participant.data.Participant[i].user_id,
                    input: {
                        ticket_bought: participant.data.Participant[i].UserNonce.ticket_bought +
                            participant.data.Participant[i].amount,
                    },
                });
                console.log(update_data);
            }
            const ticket = yield create_ticket({ input: arr });
            console.log("test1234", ticket);
            ///////////////////////////////////////////////////////////////
            //Tao ticket cho người sở hữu
            let arr_owner = [];
            const wallet_address = data.owner;
            const data_account = yield account(wallet_address);
            console.log(data_account);
            for (let i = 0; i < data.supply - data.total_raise; i++) {
                const input_ticket_owner = {
                    input: {
                        create_at: dateGet,
                        user_id: data_account.data.UserNonce[0].id,
                        type: 1,
                        status: 1,
                        TicketToken: {
                            data: {
                                event: create_event.data.insert_Event.returning[0].id,
                                image_link: data.image_event,
                                owner_address: wallet_address,
                                ticket_type: 1,
                                approver: data.approver,
                                status: 1,
                                usable: 1,
                                price: data.ticket_price,
                                class_ticket: data.ticket_class,
                            },
                        },
                    },
                };
                arr_owner.push(input_ticket_owner.input);
            }
            const update_data = yield update({
                id: data_account.data.UserNonce[0].id,
                input: {
                    ticket_issued: data_account.data.UserNonce[0].ticket_issued + data.supply,
                    ticket_sold: data_account.data.UserNonce[0].ticket_sold + data.total_raise,
                },
            });
            console.log(update_data);
            console.log(arr_owner);
            const ticket_owner = yield create_ticket({ input: arr_owner });
            console.log("ticket", ticket_owner);
        }
        else {
            console.log("cút");
        }
        return res.status(200).send("đc r");
    }
    catch (err) {
        return res.status(200).send("lỗi r nè");
    }
}));
router.post("/joincf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body.input;
    let dateGet = moment(new Date()).format("YYYY-MM-DD HH:mm");
    const data_event = yield eventcf({ id: input.input.eventcf_id });
    const wallet_address = input.input.wallet_address;
    const data_account = yield account(wallet_address);
    console.log(dateGet);
    try {
        if (data_event.data.EventCF[0].total_raise >
            data_event.data.EventCF[0].current_raise //Kiểm tra điều kiện số lượng tham gia
        ) {
            if (data_event.data.EventCF[0].total_raise >=
                data_event.data.EventCF[0].current_raise + input.input.amount //Kiểm tra điều kiện số lượng vé cần mua
            ) {
                const amount = data_event.data.EventCF[0].current_raise + input.input.amount;
                const join = yield joincf({
                    id: input.input.eventcf_id,
                    current_raise: amount,
                });
                console.log(join);
                const data_event_cf = yield getParticipant({
                    event_cf_id: input.input.eventcf_id,
                });
                const found = data_event_cf.data.Participant.find((element) => element.user_id == data_account.data.UserNonce[0].id); //tìm xem người tham gia đã tồn tại trong kho tham gia hay chưa
                if (found == undefined) {
                    const create_participants = yield create_participant({
                        create_at: dateGet,
                        event_cf_id: input.input.eventcf_id,
                        user_id: data_account.data.UserNonce[0].id,
                        amount: input.input.amount,
                    });
                    console.log(join);
                    console.log(create_participants);
                }
                else {
                    const update = yield update_participant({
                        id: found.id,
                        amount: found.amount + input.input.amount,
                    });
                    console.log(update);
                }
                return res.status(200).json({
                    data: {
                        type: 1,
                        message: "Thành công",
                    }
                });
            }
            else {
                return res.status(200).json({
                    data: {
                        type: 3,
                        message: `Số lượng tham gia chỉ con lại ${data_event.data.EventCF[0].total_raise -
                            data_event.data.EventCF[0].current_raise}`,
                        total_remain: data_event.data.EventCF[0].total_raise -
                            data_event.data.EventCF[0].current_raise
                    }
                });
            }
        }
        else {
            return res.status(200).json({
                data: {
                    type: 2,
                    message: `Vượt quá số lượng tham gia `,
                }
            });
        }
    }
    catch (_a) {
        return res.status(404).json({
            message: `Không xác định được event`,
        });
    }
}));
router.post("/close_eventcf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dateGet = moment(new Date())
        .tz("Asia/Bangkok")
        .format("YYYY-MM-DD HH:mm"); //chuyển gio heroku sang múi giờ 7
    const date_heroku = new Date(dateGet); // tạo datetime với múi giờ 7
    console.log(dateGet, date_heroku);
    try {
        let dem = 0;
        const data = yield eventcf_now();
        if (data.data.eventcf_now.length > 0) {
            for (let i in data.data.eventcf_now) {
                const end_date = new Date(data.data.eventcf_now[i].end_date_cf); // tạo datetime với múi giờ 7, giờ bắn từ client phải là múi giờ 7
                console.log(end_date);
                if (end_date - date_heroku <= 0) {
                    const close = yield close_event({
                        id: data.data.eventcf_now[i].id,
                        status: 4,
                    }); // close event trạng thái không thành công gọi vốn
                    console.log("đã close", close);
                    dem = dem + 1;
                }
            }
        }
        else {
            return res.send("Không có sự kiện nào sắp kết thúc hôm nay");
        }
        const eventcf_start_now = yield start_eventcf_now();
        if (eventcf_start_now.data.eventcf_start_now.length > 0) {
            for (let i in eventcf_start_now.data.eventcf_start_now) {
                const start_date = new Date(eventcf_start_now.data.eventcf_start_now[i].start_date_cf); // tạo datetime với múi giờ 7, giờ bắn từ client phải là múi giờ 7
                console.log(start_date);
                if (start_date - date_heroku <= 0) {
                    const close = yield close_event({
                        id: eventcf_start_now.data.eventcf_start_now[i].id,
                        status: 2,
                    }); // Bắt đầu sự kiện cf
                    console.log(close);
                }
            }
        }
        else {
            return res.send("Không có sự kiện nào hôm nay");
        }
        if (dem == 0) {
            return res.send("Đóng không thành công"); // không có event nào được close
        }
        else {
            return res.send("Đóng thành công");
        }
    }
    catch (err) {
        return res.send("Đóng không thành công");
    }
}));
router.post("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const abc = yield start_eventcf_now();
    console.log(abc);
}));
module.exports = router;
//# sourceMappingURL=index.js.map