declare namespace malarkey {
    interface MalarkeyObject {
        type(text: string): MalarkeyObject;
        pause(): MalarkeyObject;
        delete(): MalarkeyObject;
    }
}

declare function malarkey(elem: any, options: object): malarkey.MalarkeyObject;

declare module 'malarkey' {
    export = malarkey;
}
