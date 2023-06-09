export interface adminMessage {
  sender: string;
  date: string;
  desc: string;
}

export interface adminPayment {
  amount: number;
  date: string;
  viewSender: string;
}

export interface Bills {
  receiverName: string;
  address: string;
  date: string;
  amountIssued: number;
}
