import { useState } from "react";

export function useShowPassword() {
  const [showPassWord, setShowPassWord] = useState(false);
  const [showText, setShowText] = useState("show");
  function handleShowPassWord(value) {
    value ? setShowPassWord(true) : setShowPassWord(false);
  }
  function handleShowPassWordText(ref) {
    if (ref.current.type === "password") {
      ref.current.type = "text";
      setShowText("unshow");
    } else {
      ref.current.type = "password";
      setShowText("show");
    }
  }
  return {
    showPassWord,
    showText,
    handleShowPassWord,
    handleShowPassWordText,
  };
}
