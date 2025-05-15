
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { YES_LADDER_QUESTIONS_EN, YES_LADDER_QUESTIONS_VI } from "./jobFormConstants";

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
    <Card className="border-primary/10 bg-gray-50/50 shadow-sm mt-12 mb-8">
      <CardHeader className="border-b border-gray-100 bg-white">
        <CardTitle className="text-xl font-semibold text-gray-800">
          {isVietnamese ? "Nhận Thêm Kết Quả" : "Get More Results"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-5">
          {questions.map((question) => (
            <div 
              key={question.id}
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
                    <div className="mt-2 pl-0">
                      <div className="text-sm font-medium text-primary">
                        {question.feature}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {question.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {Object.values(answers).some(a => a) && (
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="text-amber-500 font-bold">⭐</div>
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
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default YesLadder;
