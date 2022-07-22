export type SerializedParams = {
    head: boolean,
    body: boolean,
    legs: boolean
}


export interface BasicActionInterface {
    toBytes(): ArrayBuffer
    getValue(): SerializedParams
    validate(): boolean
}
