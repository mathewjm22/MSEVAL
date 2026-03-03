import { useState } from 'react';
import { ChevronLeft, Save, Send, Clock, User, AlertCircle } from 'lucide-react';

export function EvaluateSession() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({
    clinicalKnowledge: 0,
    communication: 0,
    professionalism: 0,
    proceduralSkills: 0,
  });

  const categories = [
    { key: 'clinicalKnowledge', label: 'Clinical Knowledge', description: 'Understanding of medical concepts and procedures' },
    { key: 'communication', label: 'Communication', description: 'Patient interaction and information delivery' },
    { key: 'professionalism', label: 'Professionalism', description: 'Ethics, demeanor, and professional conduct' },
    { key: 'proceduralSkills', label: 'Procedural Skills', description: 'Technical execution and hand-eye coordination' },
  ];

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / 4;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-[#1a1f26] transition-colors border border-[#2f3741]">
          <ChevronLeft className="w-5 h-5 text-[#94a3b8]" />
        </button>
        <div>
          <h1 className="text-3xl font-bold">New Evaluation</h1>
          <p className="text-[#94a3b8]">Alice Johnson • Internal Medicine Rotation</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00f0ff]" />
            <span className="text-sm text-[#94a3b8]">In Progress</span>
          </div>
          <span className="text-sm text-[#00f0ff] font-bold">Step {currentStep + 1} of {categories.length}</span>
        </div>
        <div className="progress-bar h-2">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentStep + 1) / categories.length) * 100}%` }} 
          />
        </div>
      </div>

      {/* Evaluation Form */}
      <div className="glass-panel p-8 relative">
        <div className="corner-accent top-left" />
        <div className="corner-accent top-right" />
        <div className="corner-accent bottom-left" />
        <div className="corner-accent bottom-right" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{categories[currentStep].label}</h2>
          <p className="text-[#94a3b8]">{categories[currentStep].description}</p>
        </div>

        {/* Score Input */}
        <div className="space-y-6">
          <div className="flex items-center justify-between p-6 bg-[#111418] rounded-lg border border-[#2f3741]">
            <span className="text-lg font-medium">Score (1-100)</span>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={scores[categories[currentStep].key as keyof typeof scores]}
                onChange={(e) => setScores({ ...scores, [categories[currentStep].key]: parseInt(e.target.value) })}
                className="w-64 accent-[#00f0ff]"
              />
              <div className="w-20 h-12 rounded-lg bg-[#1a1f26] border border-[#00f0ff] flex items-center justify-center">
                <span className="text-xl font-bold text-[#00f0ff]">
                  {scores[categories[currentStep].key as keyof typeof scores]}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">Comments & Feedback</label>
            <textarea
              rows={4}
              placeholder="Enter detailed feedback..."
              className="resize-none"
            />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#ffaa00]/10 border border-[#ffaa00]/30">
            <AlertCircle className="w-5 h-5 text-[#ffaa00] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#ffaa00] mb-1">Rubric Reference</p>
              <p className="text-sm text-[#94a3b8]">
                90-100: Exceptional | 80-89: Proficient | 70-79: Developing | Below 70: Needs Improvement
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-[#2f3741]">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep < categories.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="btn-primary"
            >
              Next Category
            </button>
          ) : (
            <button className="btn-primary flex items-center gap-2">
              <Send className="w-4 h-4" />
              Submit Evaluation
            </button>
          )}
        </div>
      </div>

      {/* Live Score Preview */}
      <div className="glass-panel p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-[#00f0ff] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <span className="text-2xl font-bold text-[#00f0ff]">{Math.round(totalScore)}</span>
          </div>
          <div>
            <p className="text-sm text-[#94a3b8]">Current Average</p>
            <p className="text-lg font-bold text-[#f0f4f8]">
              {totalScore >= 90 ? 'Exceptional' : totalScore >= 80 ? 'Proficient' : totalScore >= 70 ? 'Developing' : 'Needs Improvement'}
            </p>
          </div>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Draft
        </button>
      </div>
    </div>
  );
}
