declare function malarkey(elem: any, options: object): malarkey.MalarkeyObject;

declare namespace malarkey {
    interface MalarkeyObject {
        type(text: string): MalarkeyObject;
        pause(): MalarkeyObject;
        delete(): MalarkeyObject;
    }
}

declare module 'malarkey' {
    export = malarkey;
}
