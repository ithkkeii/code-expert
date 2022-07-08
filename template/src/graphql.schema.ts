
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateCatInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export interface IQuery {
    cats(): Nullable<Nullable<Cat>[]> | Promise<Nullable<Nullable<Cat>[]>>;
    cat(id: string): Nullable<Cat> | Promise<Nullable<Cat>>;
}

export interface IMutation {
    createCat(createCatInput?: Nullable<CreateCatInput>): Nullable<Cat> | Promise<Nullable<Cat>>;
}

export interface ISubscription {
    catCreated(): Nullable<Cat> | Promise<Nullable<Cat>>;
}

export interface Owner {
    id: number;
    name: string;
    age?: Nullable<number>;
    cats?: Nullable<Cat[]>;
}

export interface Cat {
    id?: Nullable<number>;
    name?: Nullable<string>;
    age?: Nullable<number>;
    owner?: Nullable<Owner>;
}

type Nullable<T> = T | null;
