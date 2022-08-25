SET check_function_bodies = false;
CREATE TABLE public."Event" (
    image text NOT NULL,
    status integer NOT NULL,
    name text NOT NULL,
    end_date timestamp(3) without time zone NOT NULL,
    localtion text NOT NULL,
    owner text NOT NULL,
    start_date timestamp(3) without time zone NOT NULL,
    id integer NOT NULL,
    ticket_issued integer,
    ticket_sold integer,
    total_proceed double precision
);
CREATE TABLE public."EventCatogory" (
    type text NOT NULL,
    name text NOT NULL,
    id integer NOT NULL
);
CREATE TABLE public."EventCatogoryItem" (
    id integer NOT NULL,
    event_id integer NOT NULL,
    catogory_id integer NOT NULL
);
CREATE SEQUENCE public."EventCatogoryItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."EventCatogoryItem_id_seq" OWNED BY public."EventCatogoryItem".id;
CREATE SEQUENCE public."EventCatogory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."EventCatogory_id_seq" OWNED BY public."EventCatogory".id;
CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;
CREATE TABLE public."GateScanConfirmation" (
    ticket_token_id integer NOT NULL,
    address text NOT NULL,
    entry_at timestamp(3) without time zone NOT NULL,
    id integer NOT NULL
);
CREATE SEQUENCE public."GateScanConfirmation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."GateScanConfirmation_id_seq" OWNED BY public."GateScanConfirmation".id;
CREATE TABLE public."RateConvention" (
    currency double precision,
    date_update timestamp without time zone,
    id integer NOT NULL
);
CREATE TABLE public."TicketAccessToken" (
    owner_address text NOT NULL,
    ticket_token_id integer NOT NULL,
    id integer NOT NULL,
    token integer NOT NULL
);
CREATE SEQUENCE public."TicketAccessToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."TicketAccessToken_id_seq" OWNED BY public."TicketAccessToken".id;
CREATE SEQUENCE public."TicketAccessToken_id_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE public."TicketCollection" (
    verified boolean NOT NULL,
    id integer NOT NULL,
    owner integer NOT NULL,
    tiket_token_id integer NOT NULL,
    favorited integer NOT NULL
);
CREATE SEQUENCE public."TicketCollection_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE SEQUENCE public."TicketCollection_id_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE SEQUENCE public."TicketCollection_id_seq2"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."TicketCollection_id_seq2" OWNED BY public."TicketCollection".id;
CREATE TABLE public."TicketTokens" (
    owner_address text NOT NULL,
    ticket_type integer NOT NULL,
    id integer NOT NULL,
    event integer NOT NULL,
    status integer,
    approver jsonb,
    qrcode text,
    price double precision,
    image_link text,
    class_ticket text
);
CREATE SEQUENCE public."TicketTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."TicketTokens_id_seq" OWNED BY public."TicketTokens".id;
CREATE TABLE public."Transaction" (
    id integer NOT NULL,
    ticket_id integer NOT NULL,
    user_id integer NOT NULL,
    create_at information_schema.time_stamp,
    type integer,
    status integer
);
CREATE SEQUENCE public."Transaction_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE SEQUENCE public."Transaction_id_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE SEQUENCE public."Transaction_id_seq2"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Transaction_id_seq2" OWNED BY public."Transaction".id;
CREATE TABLE public."UserAccessToken" (
    expires_at timestamp(3) without time zone NOT NULL,
    id integer NOT NULL,
    token integer NOT NULL,
    user_id integer NOT NULL
);
CREATE SEQUENCE public."UserAccessToken_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE SEQUENCE public."UserAccessToken_id_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE SEQUENCE public."UserAccessToken_id_seq2"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."UserAccessToken_id_seq2" OWNED BY public."UserAccessToken".id;
CREATE TABLE public."UserNonce" (
    id integer NOT NULL,
    address_id integer NOT NULL,
    ticket_sold integer,
    ticket_bought integer,
    ticket_issued integer,
    ticket_one_time_use integer,
    ticket_multi_use integer,
    money_total_ticket_ot double precision,
    money_total_ticket_mul double precision,
    total_proceeds double precision
);
CREATE SEQUENCE public."UserNonce_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."UserNonce_id_seq" OWNED BY public."UserNonce".id;
CREATE SEQUENCE public."UserNonce_id_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE public."UserWallet" (
    wallet_address text NOT NULL,
    id integer NOT NULL
);
CREATE SEQUENCE public."UserWallet_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."UserWallet_id_seq" OWNED BY public."UserWallet".id;
CREATE VIEW public.event_now AS
 SELECT "Event".id,
    "Event".status,
    "Event".name,
    "Event".end_date,
    "Event".localtion,
    "Event".owner,
    "Event".start_date
   FROM public."Event"
  WHERE (to_char(("Event".end_date)::timestamp with time zone, 'YYYY-MM-DD'::text) = to_char(now(), 'YYYY-MM-DD'::text));
ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);
ALTER TABLE ONLY public."EventCatogory" ALTER COLUMN id SET DEFAULT nextval('public."EventCatogory_id_seq"'::regclass);
ALTER TABLE ONLY public."EventCatogoryItem" ALTER COLUMN id SET DEFAULT nextval('public."EventCatogoryItem_id_seq"'::regclass);
ALTER TABLE ONLY public."GateScanConfirmation" ALTER COLUMN id SET DEFAULT nextval('public."GateScanConfirmation_id_seq"'::regclass);
ALTER TABLE ONLY public."TicketAccessToken" ALTER COLUMN id SET DEFAULT nextval('public."TicketAccessToken_id_seq"'::regclass);
ALTER TABLE ONLY public."TicketCollection" ALTER COLUMN id SET DEFAULT nextval('public."TicketCollection_id_seq2"'::regclass);
ALTER TABLE ONLY public."TicketTokens" ALTER COLUMN id SET DEFAULT nextval('public."TicketTokens_id_seq"'::regclass);
ALTER TABLE ONLY public."Transaction" ALTER COLUMN id SET DEFAULT nextval('public."Transaction_id_seq2"'::regclass);
ALTER TABLE ONLY public."UserAccessToken" ALTER COLUMN id SET DEFAULT nextval('public."UserAccessToken_id_seq2"'::regclass);
ALTER TABLE ONLY public."UserNonce" ALTER COLUMN id SET DEFAULT nextval('public."UserNonce_id_seq"'::regclass);
ALTER TABLE ONLY public."UserWallet" ALTER COLUMN id SET DEFAULT nextval('public."UserWallet_id_seq"'::regclass);
ALTER TABLE ONLY public."EventCatogoryItem"
    ADD CONSTRAINT "EventCatogoryItem_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."EventCatogory"
    ADD CONSTRAINT "EventCatogory_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."GateScanConfirmation"
    ADD CONSTRAINT "GateScanConfirmation_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."TicketAccessToken"
    ADD CONSTRAINT "TicketAccessToken_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."TicketCollection"
    ADD CONSTRAINT "TicketCollection_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."TicketTokens"
    ADD CONSTRAINT "TicketTokens_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."UserAccessToken"
    ADD CONSTRAINT "UserAccessToken_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."UserNonce"
    ADD CONSTRAINT "UserNonce_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."UserWallet"
    ADD CONSTRAINT "UserWallet_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."RateConvention"
    ADD CONSTRAINT rateconvention_pk PRIMARY KEY (id);
CREATE UNIQUE INDEX "TicketAccessToken_ticket_token_id_key" ON public."TicketAccessToken" USING btree (ticket_token_id);
CREATE UNIQUE INDEX "TicketAccessToken_token_key" ON public."TicketAccessToken" USING btree (token);
CREATE UNIQUE INDEX "UserAccessToken_token_key" ON public."UserAccessToken" USING btree (token);
CREATE UNIQUE INDEX "UserNonce_address_key" ON public."UserNonce" USING btree (address_id);
CREATE UNIQUE INDEX "UserWallet_wallet_address_key" ON public."UserWallet" USING btree (wallet_address);
ALTER TABLE ONLY public."EventCatogoryItem"
    ADD CONSTRAINT eventcatogoryitem_fk FOREIGN KEY (event_id) REFERENCES public."Event"(id);
ALTER TABLE ONLY public."EventCatogoryItem"
    ADD CONSTRAINT eventcatogoryitem_fk_catogory FOREIGN KEY (catogory_id) REFERENCES public."EventCatogory"(id);
ALTER TABLE ONLY public."TicketAccessToken"
    ADD CONSTRAINT ticketaccesstoken_fk FOREIGN KEY (token) REFERENCES public."TicketTokens"(id);
ALTER TABLE ONLY public."TicketCollection"
    ADD CONSTRAINT ticketcollection_fk FOREIGN KEY (owner) REFERENCES public."UserNonce"(id);
ALTER TABLE ONLY public."TicketCollection"
    ADD CONSTRAINT ticketcollection_fk_ticket FOREIGN KEY (tiket_token_id) REFERENCES public."TicketTokens"(id);
ALTER TABLE ONLY public."TicketTokens"
    ADD CONSTRAINT tickettokens_fk FOREIGN KEY (event) REFERENCES public."Event"(id);
ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT transaction_fk FOREIGN KEY (user_id) REFERENCES public."UserNonce"(id);
ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT transaction_fk_ticket FOREIGN KEY (ticket_id) REFERENCES public."TicketTokens"(id);
ALTER TABLE ONLY public."UserAccessToken"
    ADD CONSTRAINT useraccesstoken_fk FOREIGN KEY (user_id) REFERENCES public."UserNonce"(id);
ALTER TABLE ONLY public."UserAccessToken"
    ADD CONSTRAINT useraccesstoken_fk_ticket FOREIGN KEY (token) REFERENCES public."TicketTokens"(id);
ALTER TABLE ONLY public."UserNonce"
    ADD CONSTRAINT usernonce_fk FOREIGN KEY (address_id) REFERENCES public."UserWallet"(id);
