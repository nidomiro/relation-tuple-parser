export type ModifyTypeOfAttribute<T, R extends { [k in keyof T]: unknown }> = Omit<T, keyof R> & R
