export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly EDITOR: "EDITOR";
    readonly USER: "USER";
};
export type Role = (typeof Role)[keyof typeof Role];
