import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export type PrimitiveClass = string;
export type ConditionalClasses = Readonly<Record<string, boolean>>;
export type Falsy = false | null | undefined | 0 | "";

export type ClassInput =
  | PrimitiveClass
  | ConditionalClasses
  | ReadonlyArray<PrimitiveClass | ConditionalClasses | Falsy>
  | Falsy;

export type SlotsToClasses<S extends string> = Partial<Record<S, ClassInput>>;

export function cn(...inputs: ClassInput[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Crea un resolver de clases por slot.
 * - `defaults`: clases base por slot (p. ej. diseño por defecto del componente)
 * - `overrides`: clases que llegan por props (SlotsToClasses)
 */
export function makeSlotResolver<S extends string>(
  defaults: Partial<Record<S, PrimitiveClass>>,
  overrides?: SlotsToClasses<S>
) {
  return (slot: S, extra?: ClassInput): string => {
    return cn(defaults[slot], overrides?.[slot], extra);
  };
}
