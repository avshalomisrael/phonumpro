import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  phoneNumber: string;
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  isTxt?: boolean;
  fontFamily?: string;
  recaptchaSiteKey: string;
  imagePath: string;
  imageExtension: string;
}

const numbersToText: Record<string, string> = {
  "0": "Zero", "1": "One", "2": "Two", "3": "Three", "4": "Four",
  "5": "Five", "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine",
};

const PhoneNumberProtector: React.FC<Props> = ({
  phoneNumber,
  fontSize = "18px",
  color = "black",
  backgroundColor = "white",
  isTxt = false,
  fontFamily = "Arial, sans-serif",
  recaptchaSiteKey,
  imagePath,
  imageExtension,
}) => {
  const numbersToImage: Record<string, string> = {
    "0": `${imagePath}/0.${imageExtension}`,
    "1": `${imagePath}/1.${imageExtension}`,
    "2": `${imagePath}/2.${imageExtension}`,
    "3": `${imagePath}/3.${imageExtension}`,
    "4": `${imagePath}/4.${imageExtension}`,
    "5": `${imagePath}/5.${imageExtension}`,
    "6": `${imagePath}/6.${imageExtension}`,
    "7": `${imagePath}/7.${imageExtension}`,
    "8": `${imagePath}/8.${imageExtension}`,
    "9": `${imagePath}/9.${imageExtension}`,
  };

  const numberRef = useRef<HTMLParagraphElement>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  
  const onCaptchaChange = (value: string | null) => {
    if (value) setCaptchaVerified(true);
  };

  const generateImage = async () => {
    if (!captchaVerified) {
      alert("Please complete CAPTCHA verification first.");
      return;
    }

    if (numberRef.current) {
      const canvas = await html2canvas(numberRef.current);
      const imageUrl = canvas.toDataURL("image/png");

      // Create a download link
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "phone-number.png";
      link.click();
    }
  };

  return (
    <div>
      <p
        ref={numberRef}
        style={{
          fontSize,
          color,
          backgroundColor,
          fontFamily,
          padding: "10px",
          display: "inline-block",
          borderRadius: "5px",
        }}
      >
        {captchaVerified ? (
          phoneNumber
        ) : (
          phoneNumber.split("").map((digit) => isTxt ? numbersToText[digit] : <img src={numbersToImage[digit]} key={`img-${digit}`} alt={digit} />)
        )}
      </p>
      <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={onCaptchaChange} />
    </div>
  );
};

export default PhoneNumberProtector;
