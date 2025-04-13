sample starter kit


mongostart:
mongod --config /opt/homebrew/etc/mongod.conf --fork

category and skills add
node scripts/insertSkills.js


todo: 

to extract structured information from resumes — not just skills, but also:

✅ Experience (company, role, duration)

🎓 Education (degree, institute, graduation year)

🧑‍💼 Role-related keywords (e.g., “Team Lead,” “Project Manager,” “Frontend Developer”)

To build this, the best approach is using an NLP-based backend microservice using spaCy or transformers (e.g., BERT or LayoutLM for resume PDFs).

BERT
BERT is a bidirectional transformer pretrained on unlabeled text to predict masked tokens in a sentence and to predict whether one sentence follows another. The main idea is that by randomly masking some tokens, the model can train on text to the left and right, giving it a more thorough understanding. BERT is also very versatile because its learned language representations can be adapted for other NLP tasks by fine-tuning an additional layer or head.


🤖 Suggested Stack for AI Layer
Task	                 Tech
Resume Parsing	    spaCy, PyPDF2, mammoth.js
Skill Matching	    sentence-transformers, TensorFlow
Face Analysis	    face-api.js
Summarization	    OpenAI, HuggingFace Transformers
Recommender Systems	scikit-learn, TensorFlow
Chatbot Guidance	OpenAI GPT / Rasa