
import { Loader2, Check, X } from "lucide-react";

interface FormActionsProps {
  loading: boolean;
  success: boolean;
  onCancel: () => void;
}

const FormActions = ({ loading, success, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4 pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-all flex items-center"
        disabled={loading}
      >
        <X size={18} className="mr-1.5" />
        Cancel
      </button>
      
      <button
        type="submit"
        disabled={loading || success}
        className={`px-6 py-2 rounded-lg flex items-center justify-center min-w-[120px] transition-all ${
          success 
            ? "bg-green-600 hover:bg-green-700" 
            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
        } text-white shadow-lg hover:shadow-purple-800/20`}
      >
        {loading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : success ? (
          <>
            <Check size={20} className="mr-2" />
            Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
};

export default FormActions;
