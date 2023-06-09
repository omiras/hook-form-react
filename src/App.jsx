import { useState } from "react";
import { SignUp } from "./components/SignUp";
import json from "./lib/json.json";

function App() {
  const [userData, setUserData] = useState();

  const handleData = (data) => {
    setUserData({ ...data });
  };

  return (
    <div className="flex flex-col place-content-center h-screen place-items-center gap-5">
      <SignUp handleData={handleData} />

      {userData && (
        <div>
          {
            json.languages.filter(
              (language) =>
                language.language === userData.language.toUpperCase()
            )[0].greeting
          }
          <p>Your email is: {userData.email}</p>
        </div>
      )}
    </div>
  );
}
export default App;
