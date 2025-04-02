
import { MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import { SupportQuestion } from "../../types/admin";

interface SupportQuestionsProps {
  supportQuestions: SupportQuestion[];
  markAsResolved: (id: string, currentStatus: boolean) => Promise<void>;
}

const SupportQuestions = ({ supportQuestions, markAsResolved }: SupportQuestionsProps) => {
  return (
    <div className="subtle-enter">
      <div className="flex items-center mb-4">
        <MessageSquare size={20} className="text-purple-400 mr-2" />
        <h2 className="text-xl font-medium">Support Questions</h2>
      </div>
      
      {supportQuestions.length > 0 ? (
        <div className="space-y-4">
          {supportQuestions.map(question => (
            <div 
              key={question.id} 
              className={`p-5 border rounded-xl transition-all ${
                question.resolved 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-gray-800/60 border-white/10 shadow-lg'
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <span className="mr-2">From:</span>
                    <span className="text-purple-300">{question.user_email}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(question.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-white">{question.question}</p>
                </div>
                <div>
                  <button
                    onClick={() => markAsResolved(question.id, question.resolved)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center ${
                      question.resolved 
                        ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' 
                        : 'bg-green-600/80 hover:bg-green-500/80 text-white'
                    }`}
                  >
                    {question.resolved ? (
                      <>
                        <XCircle size={16} className="mr-2" />
                        Mark Unresolved
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} className="mr-2" />
                        Mark Resolved
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800/40 rounded-xl border border-white/5 p-8 text-center">
          <p className="text-gray-400">No support questions found.</p>
        </div>
      )}
    </div>
  );
};

export default SupportQuestions;
