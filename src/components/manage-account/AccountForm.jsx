"use client";

const AccountForm = ({ formData, setFormData, handleSubmit, isSubmitting }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create New Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
             autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pin Number</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Your Pin"
            value={formData.pin}
            onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
            maxLength={4}
             autoComplete="off"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-800 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
