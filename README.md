### How to Install in React apps

```sh
npm install phonumpro
```

### How to Use

```js
import PhoneNumberProtector from "phonumpro";

function App() {
  return (
    <PhoneNumberProtector
      phoneNumber="1234567890"
      fontSize="20px"
      color="blue"
      backgroundColor="yellow"
      fontFamily="Courier New"
      recaptchaSiteKey="your-recaptcha-site-key"
      imagePath="/path-to-images"
      imageExtension="webp"
    />
  );
}

export default App;
```

### Important Notes

1. **reCAPTCHA Key**: You must provide a valid reCAPTCHA site key using the `recaptchaSiteKey` prop to enable CAPTCHA verification.You can obtain a reCAPTCHA site key by registering your site at Google reCAPTCHA.

2. **Image Option**: If you want to use images for displaying the phone number, ensure that the images are named according to the digits they represent (e.g., `0.webp`, `1.webp`, `2.webp`, etc.) and are located in the specified `imagePath`. The `imageExtension` prop should match the file extension of your images (e.g., `webp`, `png`, etc.).
