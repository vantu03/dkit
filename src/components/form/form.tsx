import { createContext, useContext } from "react";

const FormDisabledContext = createContext(false);
export const useFormDisabled = () => useContext(FormDisabledContext);

export type FormValues = Record<string, any>;
const FormInitialValuesContext = createContext<FormValues>({});
export const useFormInitialValues = () => useContext(FormInitialValuesContext);

export type FormCallback = {
    onDone?: () => void;
    onLoadingChange?: (loading: boolean) => void;
    initialData?: FormValues;
    disabled?: boolean;
}

export default function Form({
    onFinish,
    onSubmit,
    disabled = false,
    initialValues,
    ...props
}: {
    onFinish?: (formData: FormData, form: HTMLFormElement) => void;
    disabled?: boolean;
    initialValues?: FormValues;
} & React.FormHTMLAttributes<HTMLFormElement>) {
    return (
        <FormDisabledContext.Provider value={disabled}>
            <FormInitialValuesContext.Provider value={initialValues ?? {}}>
                <form
                    {...props}
                    onSubmit={(e) => {
                        e.preventDefault();

                        onSubmit?.(e);

                        if (!onFinish) return;

                        const formData = new FormData(e.currentTarget);
                        onFinish(formData, e.currentTarget);
                    }}
                />
            </FormInitialValuesContext.Provider>
        </FormDisabledContext.Provider>
    );
}
