export interface RoundCreated {
    status:  number;
    error:   boolean;
    msg:     string;
    payload: Payload;
}

export interface Payload {
    roundNumber:  number;
    contestId:    string;
    prizeId:      string;
    participants: any[];
    _id:          string;
    __v:          number;
}
