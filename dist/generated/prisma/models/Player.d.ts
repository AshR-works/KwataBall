import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PlayerModel = runtime.Types.Result.DefaultSelection<Prisma.$PlayerPayload>;
export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null;
    _avg: PlayerAvgAggregateOutputType | null;
    _sum: PlayerSumAggregateOutputType | null;
    _min: PlayerMinAggregateOutputType | null;
    _max: PlayerMaxAggregateOutputType | null;
};
export type PlayerAvgAggregateOutputType = {
    jerseyNumber: number | null;
    height: number | null;
    weight: number | null;
};
export type PlayerSumAggregateOutputType = {
    jerseyNumber: number | null;
    height: number | null;
    weight: number | null;
};
export type PlayerMinAggregateOutputType = {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    position: $Enums.Position | null;
    jerseyNumber: number | null;
    nationality: string | null;
    dateOfBirth: Date | null;
    height: number | null;
    weight: number | null;
    photoUrl: string | null;
    isActive: boolean | null;
    externalId: string | null;
    teamId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PlayerMaxAggregateOutputType = {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    position: $Enums.Position | null;
    jerseyNumber: number | null;
    nationality: string | null;
    dateOfBirth: Date | null;
    height: number | null;
    weight: number | null;
    photoUrl: string | null;
    isActive: boolean | null;
    externalId: string | null;
    teamId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PlayerCountAggregateOutputType = {
    id: number;
    firstName: number;
    lastName: number;
    position: number;
    jerseyNumber: number;
    nationality: number;
    dateOfBirth: number;
    height: number;
    weight: number;
    photoUrl: number;
    isActive: number;
    externalId: number;
    teamId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PlayerAvgAggregateInputType = {
    jerseyNumber?: true;
    height?: true;
    weight?: true;
};
export type PlayerSumAggregateInputType = {
    jerseyNumber?: true;
    height?: true;
    weight?: true;
};
export type PlayerMinAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    position?: true;
    jerseyNumber?: true;
    nationality?: true;
    dateOfBirth?: true;
    height?: true;
    weight?: true;
    photoUrl?: true;
    isActive?: true;
    externalId?: true;
    teamId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PlayerMaxAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    position?: true;
    jerseyNumber?: true;
    nationality?: true;
    dateOfBirth?: true;
    height?: true;
    weight?: true;
    photoUrl?: true;
    isActive?: true;
    externalId?: true;
    teamId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PlayerCountAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    position?: true;
    jerseyNumber?: true;
    nationality?: true;
    dateOfBirth?: true;
    height?: true;
    weight?: true;
    photoUrl?: true;
    isActive?: true;
    externalId?: true;
    teamId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PlayerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlayerWhereInput;
    orderBy?: Prisma.PlayerOrderByWithRelationInput | Prisma.PlayerOrderByWithRelationInput[];
    cursor?: Prisma.PlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PlayerCountAggregateInputType;
    _avg?: PlayerAvgAggregateInputType;
    _sum?: PlayerSumAggregateInputType;
    _min?: PlayerMinAggregateInputType;
    _max?: PlayerMaxAggregateInputType;
};
export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
    [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlayer[P]> : Prisma.GetScalarType<T[P], AggregatePlayer[P]>;
};
export type PlayerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlayerWhereInput;
    orderBy?: Prisma.PlayerOrderByWithAggregationInput | Prisma.PlayerOrderByWithAggregationInput[];
    by: Prisma.PlayerScalarFieldEnum[] | Prisma.PlayerScalarFieldEnum;
    having?: Prisma.PlayerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PlayerCountAggregateInputType | true;
    _avg?: PlayerAvgAggregateInputType;
    _sum?: PlayerSumAggregateInputType;
    _min?: PlayerMinAggregateInputType;
    _max?: PlayerMaxAggregateInputType;
};
export type PlayerGroupByOutputType = {
    id: string;
    firstName: string;
    lastName: string;
    position: $Enums.Position;
    jerseyNumber: number;
    nationality: string;
    dateOfBirth: Date;
    height: number | null;
    weight: number | null;
    photoUrl: string | null;
    isActive: boolean;
    externalId: string | null;
    teamId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: PlayerCountAggregateOutputType | null;
    _avg: PlayerAvgAggregateOutputType | null;
    _sum: PlayerSumAggregateOutputType | null;
    _min: PlayerMinAggregateOutputType | null;
    _max: PlayerMaxAggregateOutputType | null;
};
export type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PlayerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PlayerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PlayerGroupByOutputType[P]>;
}>>;
export type PlayerWhereInput = {
    AND?: Prisma.PlayerWhereInput | Prisma.PlayerWhereInput[];
    OR?: Prisma.PlayerWhereInput[];
    NOT?: Prisma.PlayerWhereInput | Prisma.PlayerWhereInput[];
    id?: Prisma.StringFilter<"Player"> | string;
    firstName?: Prisma.StringFilter<"Player"> | string;
    lastName?: Prisma.StringFilter<"Player"> | string;
    position?: Prisma.EnumPositionFilter<"Player"> | $Enums.Position;
    jerseyNumber?: Prisma.IntFilter<"Player"> | number;
    nationality?: Prisma.StringFilter<"Player"> | string;
    dateOfBirth?: Prisma.DateTimeFilter<"Player"> | Date | string;
    height?: Prisma.IntNullableFilter<"Player"> | number | null;
    weight?: Prisma.IntNullableFilter<"Player"> | number | null;
    photoUrl?: Prisma.StringNullableFilter<"Player"> | string | null;
    isActive?: Prisma.BoolFilter<"Player"> | boolean;
    externalId?: Prisma.StringNullableFilter<"Player"> | string | null;
    teamId?: Prisma.StringFilter<"Player"> | string;
    createdAt?: Prisma.DateTimeFilter<"Player"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Player"> | Date | string;
    team?: Prisma.XOR<Prisma.TeamScalarRelationFilter, Prisma.TeamWhereInput>;
};
export type PlayerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    jerseyNumber?: Prisma.SortOrder;
    nationality?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    height?: Prisma.SortOrderInput | Prisma.SortOrder;
    weight?: Prisma.SortOrderInput | Prisma.SortOrder;
    photoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    externalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    teamId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    team?: Prisma.TeamOrderByWithRelationInput;
};
export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    externalId?: string;
    AND?: Prisma.PlayerWhereInput | Prisma.PlayerWhereInput[];
    OR?: Prisma.PlayerWhereInput[];
    NOT?: Prisma.PlayerWhereInput | Prisma.PlayerWhereInput[];
    firstName?: Prisma.StringFilter<"Player"> | string;
    lastName?: Prisma.StringFilter<"Player"> | string;
    position?: Prisma.EnumPositionFilter<"Player"> | $Enums.Position;
    jerseyNumber?: Prisma.IntFilter<"Player"> | number;
    nationality?: Prisma.StringFilter<"Player"> | string;
    dateOfBirth?: Prisma.DateTimeFilter<"Player"> | Date | string;
    height?: Prisma.IntNullableFilter<"Player"> | number | null;
    weight?: Prisma.IntNullableFilter<"Player"> | number | null;
    photoUrl?: Prisma.StringNullableFilter<"Player"> | string | null;
    isActive?: Prisma.BoolFilter<"Player"> | boolean;
    teamId?: Prisma.StringFilter<"Player"> | string;
    createdAt?: Prisma.DateTimeFilter<"Player"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Player"> | Date | string;
    team?: Prisma.XOR<Prisma.TeamScalarRelationFilter, Prisma.TeamWhereInput>;
}, "id" | "externalId">;
export type PlayerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    jerseyNumber?: Prisma.SortOrder;
    nationality?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    height?: Prisma.SortOrderInput | Prisma.SortOrder;
    weight?: Prisma.SortOrderInput | Prisma.SortOrder;
    photoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    externalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    teamId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PlayerCountOrderByAggregateInput;
    _avg?: Prisma.PlayerAvgOrderByAggregateInput;
    _max?: Prisma.PlayerMaxOrderByAggregateInput;
    _min?: Prisma.PlayerMinOrderByAggregateInput;
    _sum?: Prisma.PlayerSumOrderByAggregateInput;
};
export type PlayerScalarWhereWithAggregatesInput = {
    AND?: Prisma.PlayerScalarWhereWithAggregatesInput | Prisma.PlayerScalarWhereWithAggregatesInput[];
    OR?: Prisma.PlayerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PlayerScalarWhereWithAggregatesInput | Prisma.PlayerScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Player"> | string;
    firstName?: Prisma.StringWithAggregatesFilter<"Player"> | string;
    lastName?: Prisma.StringWithAggregatesFilter<"Player"> | string;
    position?: Prisma.EnumPositionWithAggregatesFilter<"Player"> | $Enums.Position;
    jerseyNumber?: Prisma.IntWithAggregatesFilter<"Player"> | number;
    nationality?: Prisma.StringWithAggregatesFilter<"Player"> | string;
    dateOfBirth?: Prisma.DateTimeWithAggregatesFilter<"Player"> | Date | string;
    height?: Prisma.IntNullableWithAggregatesFilter<"Player"> | number | null;
    weight?: Prisma.IntNullableWithAggregatesFilter<"Player"> | number | null;
    photoUrl?: Prisma.StringNullableWithAggregatesFilter<"Player"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"Player"> | boolean;
    externalId?: Prisma.StringNullableWithAggregatesFilter<"Player"> | string | null;
    teamId?: Prisma.StringWithAggregatesFilter<"Player"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Player"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Player"> | Date | string;
};
export type PlayerCreateInput = {
    id?: string;
    firstName: string;
    lastName: string;
    position: $Enums.Position;
    jerseyNumber: number;
    nationality: string;
    dateOfBirth: Date | string;
    height?: number | null;
    weight?: number | null;
    photoUrl?: string | null;
    isActive?: boolean;
    externalId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.TeamCreateNestedOneWithoutPlayersInput;
};
export type PlayerUncheckedCreateInput = {
    id?: string;
    firstName: string;
    lastName: string;
    position: $Enums.Position;
    jerseyNumber: number;
    nationality: string;
    dateOfBirth: Date | string;
    height?: number | null;
    weight?: number | null;
    photoUrl?: string | null;
    isActive?: boolean;
    externalId?: string | null;
    teamId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PlayerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.EnumPositionFieldUpdateOperationsInput | $Enums.Position;
    jerseyNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    nationality?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    weight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    externalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.TeamUpdateOneRequiredWithoutPlayersNestedInput;
};
export type PlayerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.EnumPositionFieldUpdateOperationsInput | $Enums.Position;
    jerseyNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    nationality?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    weight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    externalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    teamId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlayerCreateManyInput = {
    id?: string;
    firstName: string;
    lastName: string;
    position: $Enums.Position;
    jerseyNumber: number;
    nationality: string;
    dateOfBirth: Date | string;
    height?: number | null;
    weight?: number | null;
    photoUrl?: string | null;
    isActive?: boolean;
    externalId?: string | null;
    teamId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PlayerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.EnumPositionFieldUpdateOperationsInput | $Enums.Position;
    jerseyNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    nationality?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    weight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    externalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlayerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.EnumPositionFieldUpdateOperationsInput | $Enums.Position;
    jerseyNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    nationality?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    weight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    externalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    teamId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlayerListRelationFilter = {
    every?: Prisma.PlayerWhereInput;
    some?: Prisma.PlayerWhereInput;
    none?: Prisma.PlayerWhereInput;
};
export type PlayerOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PlayerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    jerseyNumber?: Prisma.SortOrder;
    nationality?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    teamId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlayerAvgOrderByAggregateInput = {
    jerseyNumber?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
};
export type PlayerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    jerseyNumber?: Prisma.SortOrder;
    nationality?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    teamId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlayerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    jerseyNumber?: Prisma.SortOrder;
    nationality?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    teamId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlayerSumOrderByAggregateInput = {
    jerseyNumber?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
};
export type PlayerCreateNestedManyWithoutTeamInput = {
    create?: Prisma.XOR<Prisma.PlayerCreateWithoutTeamInput, Prisma.PlayerUncheckedCreateWithoutTeamInput> | Prisma.PlayerCreateWithoutTeamInput[] | Prisma.PlayerUncheckedCreateWithoutTeamInput[];
    connectOrCreate?: Prisma.PlayerCreateOrConnectWithoutTeamInput | Prisma.PlayerCreateOrConnectWithoutTeamInput[];
    createMany?: Prisma.PlayerCreateManyTeamInputEnvelope;
    connect?: Prisma.PlayerWhereUniqueInput | Prisma.PlayerWhereUniqueInput[];
};
export type PlayerUncheckedCreateNestedManyWithoutTeamInput = {
    create?: Prisma.XOR<Prisma.PlayerCreateWithoutTeamInput, Prisma.PlayerUncheckedCreateWithoutTeamInput> | Prisma.PlayerCreateWithoutTeamInput[] | Prisma.PlayerUncheckedCreateWithoutTeamInput[];
    connectOrCreate?: Prisma.PlayerCreateOrConnectWithoutTeamInput | Prisma.PlayerCreateOrConnectWithoutTeamInput[];
    createMany?: Prisma.PlayerCreateManyTeamInputEnvelope;
    connect?: Prisma.PlayerWhereUniqueInput | Prisma.PlayerWhereUniqueInput[];
};
export type PlayerUpdateManyWithoutTeamNestedInput = {
    create?: Prisma.XOR<Prisma.PlayerCreateWithoutTeamInput, Prisma.PlayerUncheckedCreateWithoutTeamInput> | Prisma.PlayerCreateWithoutTeamInput[] | Prisma.PlayerUncheckedCreateWithoutTeamInput[];
    connectOrCreate?: Prisma.PlayerCreateOrConnectWithoutTeamInput | Prisma.PlayerCreateOrConnectWithoutTeamInput[];
    upsert?: Prisma.PlayerUpsertWithWhereUniqueWithoutTeamInput | Prisma.PlayerUpsertWithWhereUniqueWithoutTeamInput[];
    createMany?: Prisma.PlayerCreateManyTeamInputEnvelope;
    set?: Prisma.PlayerWhereUniqueInput | Prisma.PlayerWhereUniqueInput[];
    disconnect?: Prisma.PlayerWhereUniqueInput | Prisma.PlayerWhereUniqueInput[];
    delete?: Prisma.PlayerWhereUniqueInput | Prisma.PlayerWhereUniqueInput[];
    connect?: Prisma.PlayerWhereUniqueInput | Prisma.PlayerWhereUniqueInput[];
    update?: Prisma.PlayerUpdateWithWhereUniqueWithoutTeamInput | Prisma.PlayerUpdateWithWhereUniqueWithoutTeamInput[];
    updateMany?: Prisma.PlayerUpdateManyWithWhereWithoutTeamInput | Prisma.PlayerUpdateManyWithWhereWithoutTeamInput[];
    deleteMany?: Prisma.PlayerScalarWhereInput | Prisma.PlayerScalarWhereInput[];
};
export type PlayerUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: Prisma.XOR<Prisma.PlayerCreateWithoutTeamInput, Prisma.PlayerUncheckedCreateWithoutTeamInput> | Prisma.PlayerCreateWithoutTeamInput[] | Prisma.PlayerUncheckedCreateWithoutTeamInput[];
    connectOrCreate?: Prisma.PlayerCreateOrConnectWithoutTeamInput | Prisma.PlayerCreateOrConnectWithoutTeamInput[];
    upsert?: Prisma.PlayerUpsertWithWhereUniqueWithoutTeamInput | Prisma.PlayerUpsertWithWhereUniqueWithoutTeamInput[];
    createMany?: Prisma.PlayerCreateManyTeamInputEnvelope;
    set?: Prisma.PlayerWhereUniqueInput | Prisma.PlayerWhereUniqueInput[];
    disconnect?: Prisma.PlayerWhereUniqueInput | Prisma.PlayerWhereUniqueInput[];
    delete?: Prisma.PlayerWhereUniqueInput | Prisma.PlayerWhereUniqueInput[];
    connect?: Prisma.PlayerWhereUniqueInput | Prisma.PlayerWhereUniqueInput[];
    update?: Prisma.PlayerUpdateWithWhereUniqueWithoutTeamInput | Prisma.PlayerUpdateWithWhereUniqueWithoutTeamInput[];
    updateMany?: Prisma.PlayerUpdateManyWithWhereWithoutTeamInput | Prisma.PlayerUpdateManyWithWhereWithoutTeamInput[];
    deleteMany?: Prisma.PlayerScalarWhereInput | Prisma.PlayerScalarWhereInput[];
};
export type EnumPositionFieldUpdateOperationsInput = {
    set?: $Enums.Position;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type PlayerCreateWithoutTeamInput = {
    id?: string;
    firstName: string;
    lastName: string;
    position: $Enums.Position;
    jerseyNumber: number;
    nationality: string;
    dateOfBirth: Date | string;
    height?: number | null;
    weight?: number | null;
    photoUrl?: string | null;
    isActive?: boolean;
    externalId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PlayerUncheckedCreateWithoutTeamInput = {
    id?: string;
    firstName: string;
    lastName: string;
    position: $Enums.Position;
    jerseyNumber: number;
    nationality: string;
    dateOfBirth: Date | string;
    height?: number | null;
    weight?: number | null;
    photoUrl?: string | null;
    isActive?: boolean;
    externalId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PlayerCreateOrConnectWithoutTeamInput = {
    where: Prisma.PlayerWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlayerCreateWithoutTeamInput, Prisma.PlayerUncheckedCreateWithoutTeamInput>;
};
export type PlayerCreateManyTeamInputEnvelope = {
    data: Prisma.PlayerCreateManyTeamInput | Prisma.PlayerCreateManyTeamInput[];
    skipDuplicates?: boolean;
};
export type PlayerUpsertWithWhereUniqueWithoutTeamInput = {
    where: Prisma.PlayerWhereUniqueInput;
    update: Prisma.XOR<Prisma.PlayerUpdateWithoutTeamInput, Prisma.PlayerUncheckedUpdateWithoutTeamInput>;
    create: Prisma.XOR<Prisma.PlayerCreateWithoutTeamInput, Prisma.PlayerUncheckedCreateWithoutTeamInput>;
};
export type PlayerUpdateWithWhereUniqueWithoutTeamInput = {
    where: Prisma.PlayerWhereUniqueInput;
    data: Prisma.XOR<Prisma.PlayerUpdateWithoutTeamInput, Prisma.PlayerUncheckedUpdateWithoutTeamInput>;
};
export type PlayerUpdateManyWithWhereWithoutTeamInput = {
    where: Prisma.PlayerScalarWhereInput;
    data: Prisma.XOR<Prisma.PlayerUpdateManyMutationInput, Prisma.PlayerUncheckedUpdateManyWithoutTeamInput>;
};
export type PlayerScalarWhereInput = {
    AND?: Prisma.PlayerScalarWhereInput | Prisma.PlayerScalarWhereInput[];
    OR?: Prisma.PlayerScalarWhereInput[];
    NOT?: Prisma.PlayerScalarWhereInput | Prisma.PlayerScalarWhereInput[];
    id?: Prisma.StringFilter<"Player"> | string;
    firstName?: Prisma.StringFilter<"Player"> | string;
    lastName?: Prisma.StringFilter<"Player"> | string;
    position?: Prisma.EnumPositionFilter<"Player"> | $Enums.Position;
    jerseyNumber?: Prisma.IntFilter<"Player"> | number;
    nationality?: Prisma.StringFilter<"Player"> | string;
    dateOfBirth?: Prisma.DateTimeFilter<"Player"> | Date | string;
    height?: Prisma.IntNullableFilter<"Player"> | number | null;
    weight?: Prisma.IntNullableFilter<"Player"> | number | null;
    photoUrl?: Prisma.StringNullableFilter<"Player"> | string | null;
    isActive?: Prisma.BoolFilter<"Player"> | boolean;
    externalId?: Prisma.StringNullableFilter<"Player"> | string | null;
    teamId?: Prisma.StringFilter<"Player"> | string;
    createdAt?: Prisma.DateTimeFilter<"Player"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Player"> | Date | string;
};
export type PlayerCreateManyTeamInput = {
    id?: string;
    firstName: string;
    lastName: string;
    position: $Enums.Position;
    jerseyNumber: number;
    nationality: string;
    dateOfBirth: Date | string;
    height?: number | null;
    weight?: number | null;
    photoUrl?: string | null;
    isActive?: boolean;
    externalId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PlayerUpdateWithoutTeamInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.EnumPositionFieldUpdateOperationsInput | $Enums.Position;
    jerseyNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    nationality?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    weight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    externalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlayerUncheckedUpdateWithoutTeamInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.EnumPositionFieldUpdateOperationsInput | $Enums.Position;
    jerseyNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    nationality?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    weight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    externalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlayerUncheckedUpdateManyWithoutTeamInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.EnumPositionFieldUpdateOperationsInput | $Enums.Position;
    jerseyNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    nationality?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    weight?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    externalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlayerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    position?: boolean;
    jerseyNumber?: boolean;
    nationality?: boolean;
    dateOfBirth?: boolean;
    height?: boolean;
    weight?: boolean;
    photoUrl?: boolean;
    isActive?: boolean;
    externalId?: boolean;
    teamId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    team?: boolean | Prisma.TeamDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["player"]>;
export type PlayerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    position?: boolean;
    jerseyNumber?: boolean;
    nationality?: boolean;
    dateOfBirth?: boolean;
    height?: boolean;
    weight?: boolean;
    photoUrl?: boolean;
    isActive?: boolean;
    externalId?: boolean;
    teamId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    team?: boolean | Prisma.TeamDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["player"]>;
export type PlayerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    position?: boolean;
    jerseyNumber?: boolean;
    nationality?: boolean;
    dateOfBirth?: boolean;
    height?: boolean;
    weight?: boolean;
    photoUrl?: boolean;
    isActive?: boolean;
    externalId?: boolean;
    teamId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    team?: boolean | Prisma.TeamDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["player"]>;
export type PlayerSelectScalar = {
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    position?: boolean;
    jerseyNumber?: boolean;
    nationality?: boolean;
    dateOfBirth?: boolean;
    height?: boolean;
    weight?: boolean;
    photoUrl?: boolean;
    isActive?: boolean;
    externalId?: boolean;
    teamId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PlayerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "firstName" | "lastName" | "position" | "jerseyNumber" | "nationality" | "dateOfBirth" | "height" | "weight" | "photoUrl" | "isActive" | "externalId" | "teamId" | "createdAt" | "updatedAt", ExtArgs["result"]["player"]>;
export type PlayerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    team?: boolean | Prisma.TeamDefaultArgs<ExtArgs>;
};
export type PlayerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    team?: boolean | Prisma.TeamDefaultArgs<ExtArgs>;
};
export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    team?: boolean | Prisma.TeamDefaultArgs<ExtArgs>;
};
export type $PlayerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Player";
    objects: {
        team: Prisma.$TeamPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        firstName: string;
        lastName: string;
        position: $Enums.Position;
        jerseyNumber: number;
        nationality: string;
        dateOfBirth: Date;
        height: number | null;
        weight: number | null;
        photoUrl: string | null;
        isActive: boolean;
        externalId: string | null;
        teamId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["player"]>;
    composites: {};
};
export type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PlayerPayload, S>;
export type PlayerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PlayerCountAggregateInputType | true;
};
export interface PlayerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Player'];
        meta: {
            name: 'Player';
        };
    };
    findUnique<T extends PlayerFindUniqueArgs>(args: Prisma.SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PlayerClient<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlayerClient<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PlayerFindFirstArgs>(args?: Prisma.SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma.Prisma__PlayerClient<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlayerClient<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PlayerFindManyArgs>(args?: Prisma.SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PlayerCreateArgs>(args: Prisma.SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma.Prisma__PlayerClient<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PlayerCreateManyArgs>(args?: Prisma.SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PlayerDeleteArgs>(args: Prisma.SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma.Prisma__PlayerClient<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PlayerUpdateArgs>(args: Prisma.SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma.Prisma__PlayerClient<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PlayerDeleteManyArgs>(args?: Prisma.SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PlayerUpdateManyArgs>(args: Prisma.SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PlayerUpsertArgs>(args: Prisma.SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma.Prisma__PlayerClient<runtime.Types.Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PlayerCountArgs>(args?: Prisma.Subset<T, PlayerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PlayerCountAggregateOutputType> : number>;
    aggregate<T extends PlayerAggregateArgs>(args: Prisma.Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>;
    groupBy<T extends PlayerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PlayerGroupByArgs['orderBy'];
    } : {
        orderBy?: PlayerGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PlayerFieldRefs;
}
export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    team<T extends Prisma.TeamDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TeamDefaultArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PlayerFieldRefs {
    readonly id: Prisma.FieldRef<"Player", 'String'>;
    readonly firstName: Prisma.FieldRef<"Player", 'String'>;
    readonly lastName: Prisma.FieldRef<"Player", 'String'>;
    readonly position: Prisma.FieldRef<"Player", 'Position'>;
    readonly jerseyNumber: Prisma.FieldRef<"Player", 'Int'>;
    readonly nationality: Prisma.FieldRef<"Player", 'String'>;
    readonly dateOfBirth: Prisma.FieldRef<"Player", 'DateTime'>;
    readonly height: Prisma.FieldRef<"Player", 'Int'>;
    readonly weight: Prisma.FieldRef<"Player", 'Int'>;
    readonly photoUrl: Prisma.FieldRef<"Player", 'String'>;
    readonly isActive: Prisma.FieldRef<"Player", 'Boolean'>;
    readonly externalId: Prisma.FieldRef<"Player", 'String'>;
    readonly teamId: Prisma.FieldRef<"Player", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Player", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Player", 'DateTime'>;
}
export type PlayerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelect<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    include?: Prisma.PlayerInclude<ExtArgs> | null;
    where: Prisma.PlayerWhereUniqueInput;
};
export type PlayerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelect<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    include?: Prisma.PlayerInclude<ExtArgs> | null;
    where: Prisma.PlayerWhereUniqueInput;
};
export type PlayerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelect<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    include?: Prisma.PlayerInclude<ExtArgs> | null;
    where?: Prisma.PlayerWhereInput;
    orderBy?: Prisma.PlayerOrderByWithRelationInput | Prisma.PlayerOrderByWithRelationInput[];
    cursor?: Prisma.PlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlayerScalarFieldEnum | Prisma.PlayerScalarFieldEnum[];
};
export type PlayerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelect<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    include?: Prisma.PlayerInclude<ExtArgs> | null;
    where?: Prisma.PlayerWhereInput;
    orderBy?: Prisma.PlayerOrderByWithRelationInput | Prisma.PlayerOrderByWithRelationInput[];
    cursor?: Prisma.PlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlayerScalarFieldEnum | Prisma.PlayerScalarFieldEnum[];
};
export type PlayerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelect<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    include?: Prisma.PlayerInclude<ExtArgs> | null;
    where?: Prisma.PlayerWhereInput;
    orderBy?: Prisma.PlayerOrderByWithRelationInput | Prisma.PlayerOrderByWithRelationInput[];
    cursor?: Prisma.PlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlayerScalarFieldEnum | Prisma.PlayerScalarFieldEnum[];
};
export type PlayerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelect<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    include?: Prisma.PlayerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlayerCreateInput, Prisma.PlayerUncheckedCreateInput>;
};
export type PlayerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PlayerCreateManyInput | Prisma.PlayerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PlayerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    data: Prisma.PlayerCreateManyInput | Prisma.PlayerCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PlayerIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PlayerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelect<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    include?: Prisma.PlayerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlayerUpdateInput, Prisma.PlayerUncheckedUpdateInput>;
    where: Prisma.PlayerWhereUniqueInput;
};
export type PlayerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PlayerUpdateManyMutationInput, Prisma.PlayerUncheckedUpdateManyInput>;
    where?: Prisma.PlayerWhereInput;
    limit?: number;
};
export type PlayerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlayerUpdateManyMutationInput, Prisma.PlayerUncheckedUpdateManyInput>;
    where?: Prisma.PlayerWhereInput;
    limit?: number;
    include?: Prisma.PlayerIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PlayerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelect<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    include?: Prisma.PlayerInclude<ExtArgs> | null;
    where: Prisma.PlayerWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlayerCreateInput, Prisma.PlayerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PlayerUpdateInput, Prisma.PlayerUncheckedUpdateInput>;
};
export type PlayerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelect<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    include?: Prisma.PlayerInclude<ExtArgs> | null;
    where: Prisma.PlayerWhereUniqueInput;
};
export type PlayerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlayerWhereInput;
    limit?: number;
};
export type PlayerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlayerSelect<ExtArgs> | null;
    omit?: Prisma.PlayerOmit<ExtArgs> | null;
    include?: Prisma.PlayerInclude<ExtArgs> | null;
};
