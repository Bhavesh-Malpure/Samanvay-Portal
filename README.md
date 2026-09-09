# Samanvay Portal

### AI-Powered Civic Problem Solving & University–Industry Collaboration Platform

**Samanvay Portal** is a digital civic problem-solving platform designed to connect **citizens, government authorities, universities, students, faculty/mentors, and industry** through a structured, AI-assisted workflow.

The platform enables citizens to report real-world societal problems and helps government authorities validate, prioritize, and route those problems to suitable universities and technical teams. AI assists throughout the process by analyzing problems, identifying required expertise, matching problems with university capabilities, and supporting efficient project allocation.

> **Samanvay** means coordination and collaboration — the core principle behind the platform.

---

## 🎯 Vision

To create a collaborative ecosystem where:

**Citizen Problems → Government Validation → AI Analysis → University Matching → Talent & Capability Bidding → Team Formation → Project Execution → Industry Collaboration → Deployment → Measurable Social Impact**

Samanvay Portal aims to transform isolated civic complaints into structured, technology-driven projects that can be solved through collaboration between government, academia, students, and industry.

---

## 🚀 Key Features

### 👥 Role-Based Platform

The system supports multiple user roles:

* Citizens
* Government Authorities
* University Higher Authorities
* Faculty / Mentors
* Students
* Industry Partners

Each role receives its own dashboard and workflow.

---

### 📍 Location-Based Access

Location permission is the starting gate of the platform.

The prototype currently focuses on:

**Dhule District, Maharashtra**

Location information can be used to associate reported problems with the appropriate district and government ecosystem.

---

### 🧑‍💼 Citizen Problem Reporting

Citizens can:

* Submit civic problems
* Add a problem title and detailed description
* Select a category
* Provide location information
* Upload supporting images
* Track submitted problems
* View problem status history
* Receive notifications regarding their problems

The current prototype supports image uploads with validation for file type, size, and maximum number of images.

---

## 🤖 AI-Powered Problem Analysis

Samanvay Portal integrates **Groq-powered LLM analysis** to analyze submitted civic problems.

The AI analysis includes:

### Problem Classification

Identifies:

* Domain
* Sub-category
* Important keywords
* Required technical/academic expertise

### Problem Summarization

Generates a structured understanding containing:

* Problem statement
* Public impact
* Context
* Practical requirements

### Priority Recommendation

AI recommends a priority score and level based on:

* Severity
* Public impact
* Urgency
* Safety implications
* Scale of the problem

Government authorities retain the final decision-making authority.

### Similar Problem Detection

The AI compares a newly submitted problem with existing candidate problems and identifies meaningful potential similarities.

Similar problems are treated as **potential matches rather than confirmed duplicates**.

---

## ⚡ Problem Priority Structure

The prototype follows a predefined priority structure:

| Problem Area                              | Default Priority |
| ----------------------------------------- | ---------------- |
| Electricity-related public infrastructure | High             |
| Water & sanitation                        | Medium-High      |
| PWD & road development                    | Minimum          |

AI may adjust its recommendation according to the actual severity, scale, urgency, impact, and safety implications of an individual problem.

Final priority decisions remain with government authorities.

---

# 🏛️ Government Workflow

Government authorities form the central validation and coordination layer.

The workflow includes:

1. Receive citizen problems
2. Review submitted information
3. Validate problems
4. Review AI-generated analysis
5. Confirm or modify priority
6. Identify required expertise
7. Initiate university/talent matching
8. Invite eligible universities
9. Evaluate university capability bids
10. Select a university
11. Assign the project
12. Monitor execution
13. Measure impact
14. Review citizen feedback

Government users also receive notifications and access to analytics.

---

# 🏫 University Ecosystem

The university side contains multiple role-specific workspaces.

### University Higher Authority

Responsible for:

* Managing university participation
* Reviewing assigned problems/projects
* Allocating projects
* Managing teams
* Coordinating faculty and students

### Faculty / Mentors

Responsible for:

* Reviewing project requirements
* Guiding student teams
* Monitoring progress
* Reviewing milestones
* Supporting technical execution

### Students

Students receive a dedicated workspace to:

* View assigned projects
* Work within teams
* Complete tasks
* Submit milestones
* Upload project documents
* Participate in testing
* Track project progress

---

# 🤝 University Capability & Talent Bidding

Eligible universities can respond to government project requirements.

The system supports:

### University Capability Bids

Universities can demonstrate:

* Available skills
* Technical expertise
* Departments
* Faculty expertise
* Student capabilities
* Relevant experience
* Available resources

### Talent Bidding

Government authorities can identify the expertise required for a problem and allow eligible universities/teams to participate.

AI evaluates and ranks suitable bids to assist government decision-making.

The government retains final selection authority.

---

# 🧠 AI Matching & Ranking

The platform is designed to use AI for matching civic problems with appropriate academic and technical capabilities.

The matching workflow is:

```text
Problem
   ↓
AI Analysis
   ↓
Required Expertise
   ↓
Eligible Universities
   ↓
University Capability / Talent Bids
   ↓
AI Evaluation & Ranking
   ↓
Government Selection
   ↓
University Assignment
```

The AI acts as a decision-support system rather than replacing government authority.

---

# 👨‍💻 Project Execution Workflow

After a university is selected:

```text
Government Assignment
        ↓
University Allocation
        ↓
Faculty / Mentor Assignment
        ↓
Student Team Formation
        ↓
Project Creation
        ↓
Milestones
        ↓
Development
        ↓
Documents & Testing
        ↓
Industry Collaboration
        ↓
Deployment
        ↓
Impact Measurement
        ↓
Citizen Feedback
```

---

# 🏭 Industry Collaboration

Industry partners can participate in projects by providing:

* Technical expertise
* Mentorship
* Development support
* Industry guidance
* Technology resources
* Deployment support

This helps bridge the gap between academic projects and real-world implementation.

---

# 📊 Impact Measurement

After deployment, the platform can track the real-world impact of completed projects.

Possible measurements include:

* Number of citizens affected
* Problem resolution rate
* Time taken to resolve problems
* Project completion rate
* Citizen satisfaction
* Deployment status
* Social impact indicators

Citizen feedback can be collected after implementation.

---

# 🔔 Notification System

Notifications are available across the platform for relevant workflow events.

Users can receive notifications regarding:

* Problem submission
* Government validation
* Status changes
* Project assignment
* University bidding
* Team/project updates
* Milestones
* Approvals
* Feedback
* Other workflow events

---

# 🗃️ Prototype Data

The current prototype is scoped to:

**District:** Dhule, Maharashtra

The university ecosystem uses a **synthetic university database** for demonstration purposes.

This allows the complete workflow to be demonstrated without depending on production institutional databases.

---

# 🎨 Design System

The Samanvay Portal uses the following fixed color palette:

| Color            | Hex       |
| ---------------- | --------- |
| Light Background | `#FFF5F5` |
| Soft Pink        | `#F7D6D0` |
| Accent Pink      | `#E2B4BD` |
| Dark Text        | `#4A4A4A` |

The interface follows a clean, accessible, role-oriented dashboard design.

---

# 🏗️ System Architecture

The project follows a frontend-backend-AI architecture.

```text
┌─────────────────────────────┐
│          Frontend           │
│       React Application     │
└──────────────┬──────────────┘
               │
               │ REST API
               ▼
┌─────────────────────────────┐
│          Backend            │
│          FastAPI             │
│                             │
│ Authentication              │
│ Problems                    │
│ Government                  │
│ Universities                │
│ Projects                    │
│ Notifications               │
│ Users                       │
└──────────────┬──────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │   AI Layer   │
│   Database   │  │    Groq LLM  │
└──────────────┘  └──────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* JavaScript
* HTML5
* CSS
* React-based dashboards and components

## Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* JWT Authentication

## Database

* PostgreSQL

## AI

* Groq API
* LLM-based structured problem analysis
* AI classification
* AI summarization
* AI priority recommendation
* Semantic similarity analysis
* University/talent matching and ranking

## Development

* Git
* GitHub
* Python Virtual Environment
* REST APIs

---

# 📁 Project Structure

```text
samanvay-portal/
│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   │   ├── analysis_service.py
│   │   │   ├── classifier.py
│   │   │   ├── duplicate_detector.py
│   │   │   ├── embeddings.py
│   │   │   ├── industry_matcher.py
│   │   │   ├── llm_client.py
│   │   │   ├── priority_engine.py
│   │   │   ├── prompts.py
│   │   │   ├── schemas.py
│   │   │   ├── summarizer.py
│   │   │   └── university_matcher.py
│   │   │
│   │   ├── core/
│   │   ├── models/
│   │   ├── routes/
│   │   └── schemas/
│   │
│   ├── uploads/
│   ├── requirements.txt
│   └── test_groq.py
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
└── README.md
```

> Some AI modules currently represent planned/structured components and will be implemented progressively as the corresponding workflow features are developed.

---

# 🔐 Security

The backend uses:

* JWT-based authentication
* Role-based access control
* Password hashing
* Protected API routes
* Environment variables for secrets
* Input validation
* Image upload validation

Sensitive configuration such as API keys, database credentials, and email credentials should be stored in `.env` and must **not** be committed to GitHub.

---

# ⚙️ Local Development

## 1. Clone the repository

```bash
git clone https://github.com/Bhavesh-Malpure/Samanvay-Portal.git
cd Samanvay-Portal
```

## 2. Create Python virtual environment

Windows:

```powershell
python -m venv venv
```

Activate it:

```powershell
venv\Scripts\activate
```

## 3. Install backend dependencies

```powershell
cd backend
pip install -r requirements.txt
```

## 4. Configure environment variables

Create a `.env` file inside the backend directory and configure the required values.

Example:

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_api_key

MAIL_USERNAME=your_email
MAIL_PASSWORD=your_email_app_password
MAIL_FROM=your_email
```

**Never commit `.env` to GitHub.**

## 5. Start the backend

From the `backend` directory:

```powershell
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

## 6. Start the frontend

From the frontend directory:

```bash
npm install
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

---

# 🧪 AI Testing

A standalone Groq connectivity test is available:

```powershell
python test_groq.py
```

A successful connection should return:

```text
Groq connection successful
```

---

# 🔄 Development Strategy

Samanvay Portal is being developed using a **feature-by-feature dependency approach**.

A feature is considered complete only after its applicable:

* Frontend
* Backend
* AI
* Integration
* Testing

are completed.

The development lifecycle follows:

```text
Location Permission
        ↓
Landing / Home
        ↓
Login / Registration
        ↓
Role-Based Dashboard
        ↓
Citizen Problem Submission
        ↓
AI Problem Analysis
        ↓
Government Validation
        ↓
AI Matching
        ↓
Government Talent Bidding
        ↓
University Capability Bidding
        ↓
AI Bid Evaluation & Ranking
        ↓
Government University Selection
        ↓
University Project Allocation
        ↓
Team Management
        ↓
Faculty / Mentor Workflow
        ↓
Student Workspace
        ↓
Project Execution
        ↓
Industry Collaboration
        ↓
Milestones / Documents / Testing
        ↓
Deployment
        ↓
Impact Measurement
        ↓
Citizen Feedback
        ↓
Government Analytics
```

---

# 🌱 Future Scope

The platform can be expanded beyond the current prototype with:

* Production government integrations
* Real university databases
* Advanced semantic matching
* AI-assisted project planning
* Real-time chat
* Payment/incentive systems
* Mobile applications
* Advanced GIS visualization
* Government open-data integration
* Real-time analytics
* Automated impact reporting
* Scalable multi-district deployment
* Multi-state expansion

---

# 🎓 SIH 2026

Samanvay Portal is being developed as a **Smart India Hackathon 2026** project prototype focused on creating a technology-enabled ecosystem for solving real-world societal problems through collaboration between citizens, government, academia, and industry.

---

# 👨‍💻 Team

**Team Samanvay**

Project:

**Samanvay Portal**

Prototype District:

**Dhule, Maharashtra**

---

## 📜 License

This project is intended for educational, demonstration, and hackathon purposes.

License details can be added according to the team's open-source distribution requirements.

---

## 💡 Samanvay

> **Connect Problems. Match Talent. Build Solutions. Create Impact.**
