
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { YES_LADDER_QUESTIONS_EN, YES_LADDER_QUESTIONS_VI } from "./jobFormConstants";
import { motion } from "framer-motion";

interface YesLadderProps {
  onYesAnswered: (questionId: string, value: boolean) => void;
}

const YesLadder: React.FC<YesLadderProps> = ({ onYesAnswered }) => {
  const { isVietnamese } = useTranslation();
  const questions = isVietnamese ? YES_LADDER_QUESTIONS_VI : YES_LADDER_QUESTIONS_EN;
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (questionId: string, checked: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: checked
    }));
    
    onYesAnswered(questionId, checked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-primary/10 bg-gray-50/50 shadow-lg rounded-xl mt-12 mb-8">
        <CardHeader className="border-b border-gray-100 bg-white rounded-t-xl">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {isVietnamese ? "Nhận Thêm Kết Quả" : "Get More Results"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-5">
            {questions.map((question, index) => (
              <motion.div 
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  answers[question.id] 
                    ? "bg-primary/5 border border-primary/20" 
                    : "bg-white border border-gray-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id={question.id} 
                    checked={answers[question.id] || false}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(question.id, checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label 
                      htmlFor={question.id} 
                      className="text-base font-medium cursor-pointer leading-tight"
                    >
                      {question.question}
                    </Label>
                    
                    {answers[question.id] && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2 pl-0"
                      >
                        <div className="text-sm font-medium text-primary">
                          {question.feature}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {question.description}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {Object.values(answers).some(a => a) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200"
            >
              <div className="flex items-start gap-3">
                <div className="text-amber-500 font-bold text-xl">⭐</div>
                <div>
                  <p className="text-gray-800">
                    <span className="font-semibold">
                      {isVietnamese 
                        ? "Được tin dùng bởi 94% chủ tiệm:" 
                        : "Trusted by 94% of salon owners:"}
                    </span> {" "}
                    {isVietnamese 
                      ? "Các tính năng cao cấp giúp bạn tuyển dụng nhanh hơn 73% so với đăng tin thông thường." 
                      : "Premium features help you hire 73% faster than standard listings."}
                  </p>
                  <p className="text-xs italic text-gray-500 mt-1">
                    {isVietnamese 
                      ? ""Chúng tôi tuyển được thợ giỏi chỉ sau 2 ngày!" - Anna, Chủ Salon" 
                      : ""We found a great artist in just 2 days!" - Anna, Salon Owner"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default YesLadder;
