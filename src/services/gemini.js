/**
 * Gemini AI service for content generation
 * Provides quiz question generation and content enhancement features
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Generate quiz questions based on course content
 * @param {string} topic - The topic or lesson content
 * @param {number} questionCount - Number of questions to generate (default: 5)
 * @returns {Promise<Array>} Array of quiz questions
 */
export const generateQuizQuestions = async (topic, questionCount = 5) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `
      Generate ${questionCount} multiple-choice quiz questions about: "${topic}"
      
      Requirements:
      - Each question should have 4 answer options (A, B, C, D)
      - Only one correct answer per question
      - Include an explanation for the correct answer
      - Questions should be educational and test understanding
      - Vary difficulty from basic to intermediate
      
      Return the response as a JSON array with this exact structure:
      [
        {
          "question": "Question text here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Explanation of why this answer is correct"
        }
      ]
      
      Only return the JSON array, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const questions = JSON.parse(text.trim());
    
    // Validate the structure
    if (!Array.isArray(questions)) {
      throw new Error('Invalid response format');
    }
    
    return questions.map((q, index) => ({
      id: `generated_${Date.now()}_${index}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      type: 'multiple-choice'
    }));
    
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    
    // Return fallback questions if API fails
    return [
      {
        id: `fallback_${Date.now()}`,
        question: `What is the main concept covered in "${topic}"?`,
        options: [
          'Basic understanding',
          'Advanced concepts',
          'Practical applications',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'This topic typically covers multiple aspects including basic understanding, advanced concepts, and practical applications.',
        type: 'multiple-choice'
      }
    ];
  }
};

/**
 * Generate learning objectives for a course
 * @param {string} courseTitle - The course title
 * @param {string} courseDescription - The course description
 * @returns {Promise<Array>} Array of learning objectives
 */
export const generateLearningObjectives = async (courseTitle, courseDescription) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `
      Generate 5-7 clear learning objectives for a course titled: "${courseTitle}"
      Course description: "${courseDescription}"
      
      Learning objectives should:
      - Start with action verbs (understand, analyze, create, evaluate, etc.)
      - Be specific and measurable
      - Be appropriate for the course level
      - Cover different cognitive levels (knowledge, comprehension, application, analysis)
      
      Return as a JSON array of strings:
      ["Objective 1", "Objective 2", ...]
      
      Only return the JSON array, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text.trim());
    
  } catch (error) {
    console.error('Error generating learning objectives:', error);
    
    // Return fallback objectives
    return [
      'Understand the fundamental concepts of the subject',
      'Apply knowledge to practical scenarios',
      'Analyze complex problems and solutions',
      'Evaluate different approaches and methodologies'
    ];
  }
};

/**
 * Enhance lesson content with additional information
 * @param {string} content - The original lesson content
 * @param {string} enhancementType - Type of enhancement ('expand', 'summarize', 'examples')
 * @returns {Promise<string>} Enhanced content
 */
export const enhanceContent = async (content, enhancementType = 'expand') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    let prompt = '';
    
    switch (enhancementType) {
      case 'expand':
        prompt = `
          Expand the following lesson content with additional details, examples, and explanations:
          
          "${content}"
          
          Make it more comprehensive while maintaining clarity and educational value.
        `;
        break;
        
      case 'summarize':
        prompt = `
          Create a concise summary of the following lesson content:
          
          "${content}"
          
          Focus on the key points and main concepts.
        `;
        break;
        
      case 'examples':
        prompt = `
          Add practical examples and use cases to the following lesson content:
          
          "${content}"
          
          Include real-world applications and scenarios.
        `;
        break;
        
      default:
        return content;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('Error enhancing content:', error);
    return content; // Return original content if enhancement fails
  }
};

/**
 * Generate course outline based on title and description
 * @param {string} courseTitle - The course title
 * @param {string} courseDescription - The course description
 * @returns {Promise<Array>} Array of modules with lessons
 */
export const generateCourseOutline = async (courseTitle, courseDescription) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `
      Generate a comprehensive course outline for: "${courseTitle}"
      Description: "${courseDescription}"
      
      Create 4-6 modules, each with 3-5 lessons.
      
      Return as JSON with this structure:
      [
        {
          "title": "Module Title",
          "description": "Module description",
          "lessons": [
            {
              "title": "Lesson Title",
              "description": "Lesson description",
              "estimatedDuration": "30 minutes"
            }
          ]
        }
      ]
      
      Only return the JSON array, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text.trim());
    
  } catch (error) {
    console.error('Error generating course outline:', error);
    
    // Return fallback outline
    return [
      {
        title: 'Introduction',
        description: 'Getting started with the course',
        lessons: [
          {
            title: 'Course Overview',
            description: 'Introduction to the course content and objectives',
            estimatedDuration: '15 minutes'
          },
          {
            title: 'Prerequisites',
            description: 'What you need to know before starting',
            estimatedDuration: '10 minutes'
          }
        ]
      }
    ];
  }
};
