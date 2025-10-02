"use client";
import { useReducer, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

type FormState = { name: string; email: string; password: string };

type Action =
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "RESET" };

const initialState: FormState = { name: "", email: "", password: "" };

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useRegister() {
  const { register } = useAuth();
  const [form, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = useCallback(
    (field: keyof FormState, value: string) =>
      dispatch({ type: "SET_FIELD", field, value }),
    []
  );

  const submit = useCallback(
    async (onSuccess?: () => void) => {
      setLoading(true);
      setError(null);
      try {
        await register(form.name, form.email, form.password);
        onSuccess?.();
        dispatch({ type: "RESET" });
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo crear la cuenta");
      } finally {
        setLoading(false);
      }
    },
    [form, register]
  );

  return {
    form,
    setField,
    submit,
    loading,
    error,
  };
}
