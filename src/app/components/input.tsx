"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && <label className="text-sm text-foreground">{label}</label>}
            <input
              className={`px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-shadow ${className}`}
              {...props}
            />
            {error && <span className="text-sm text-destructive">{error}</span>}
        </div>
    );
}