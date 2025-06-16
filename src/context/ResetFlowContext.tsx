import React, { createContext, useContext, useState } from "react";

type ResetFlowContextType = {
  email: string;
  otp: string;
  codeVerified: boolean;
  passwordReset: boolean;
  setUserEmail: (email: string) => void;
  setOtp: (otp: string) => void;
  setCodeVerified: (value: boolean) => void;
  setPasswordReset: (value: boolean) => void;
};

const ResetFlowContext = createContext<ResetFlowContextType | undefined>(undefined);

export const ResetFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  return (
    <ResetFlowContext.Provider
      value={{
        email,
        otp,
        codeVerified,
        passwordReset,
        setUserEmail: setEmail,
        setOtp,
        setCodeVerified,
        setPasswordReset,
      }}
    >
      {children}
    </ResetFlowContext.Provider>
  );
};

export const useResetFlow = () => {
  const context = useContext(ResetFlowContext);
  if (!context) {
    throw new Error("useResetFlow must be used inside ResetFlowProvider");
  }
  return context;
};