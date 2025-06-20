import OtpInput from "react-otp-input";

const PinContainer = ({
  pinError,
  hendlePinSubmit,
  pin,
  setPin,
}) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-black">Profile Locked 🔒</h2>
      {pinError && (
        <p className="text-red-600 font-medium">Whoops! Wrong PIN, Enter your 4-digit PIN to access this profile.</p>
      ) }

      <OtpInput
        value={pin}
        onChange={setPin}
        numInputs={4}
        inputStyle={{
          width: "3rem",
          height: "3rem",
          fontSize: "1.5rem",
          borderRadius: "0.375rem",
          border: "1px solid #ccc",
          color:"#000"
        }}
        shouldAutoFocus
        renderSeparator={<span className="mx-2">-</span>}
        renderInput={(props) => <input {...props} />}
      />

      <button
        onClick={hendlePinSubmit}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      >
        Submit PIN
      </button>
    </div>
  );
};

export default PinContainer;
