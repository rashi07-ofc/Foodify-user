import React from "react";
import { Navigate } from "react-router-dom";
import { useResetFlow } from "./../context/ResetFlowContext";

interface Props {
  requiredStep: number;
  children: React.ReactNode;
}

export default function ProtectedStepRoute({ requiredStep, children }: Props) {
  const { step } = useResetFlow();

  return step >= requiredStep ? (
    <>{children}</>
  ) : (
    <Navigate to="/forgot-password" replace />
  );
}
