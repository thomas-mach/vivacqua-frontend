export function useRecaptcha() {
  function execute(action) {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject("reCAPTCHA non caricato");
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute("6LdL6lcrAAAAANsMA0w0r2uGhMflObfsTr5oDmo-", { action })
          .then((token) => {
            resolve(token);
          })
          .catch((err) => reject(err));
      });
    });
  }

  return { execute };
}
