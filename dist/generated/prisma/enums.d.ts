export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly EDITOR: "EDITOR";
    readonly USER: "USER";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const Position: {
    readonly POINT_GUARD: "POINT_GUARD";
    readonly SHOOTING_GUARD: "SHOOTING_GUARD";
    readonly SMALL_FORWARD: "SMALL_FORWARD";
    readonly POWER_FORWARD: "POWER_FORWARD";
    readonly CENTER: "CENTER";
};
export type Position = (typeof Position)[keyof typeof Position];
