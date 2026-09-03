# 🌸 Samanvay Portal

### *Connecting Citizens • Government • Universities • Industry*

**Samanvay Portal** is a collaborative societal problem-solving platform designed to connect citizens, government authorities, educational institutions, and industries through a unified digital ecosystem.

The platform enables citizens to report local problems, helps authorities validate and prioritize them, and connects suitable university teams and industry partners to transform real-world problems into structured, trackable solutions.

> **Samanvay** — *Collaboration that turns problems into solutions.*

---

## ✨ Vision

To create a transparent and collaborative ecosystem where **every societal problem can find the right people, resources, and expertise to solve it.**

Samanvay brings four major stakeholders together:

| Stakeholder         | Role                                                         |
| ------------------- | ------------------------------------------------------------ |
| 👥 **Citizens**     | Report and track local problems                              |
| 🏛️ **Government**  | Validate, prioritize, route, and monitor problems            |
| 🎓 **Universities** | Assign students and faculty to real-world projects           |
| 🏢 **Industry**     | Provide expertise, technology, mentorship, and collaboration |

---

## 🚀 What Samanvay Does

### 1. 📍 Location-Based Problem Reporting

Citizens can report problems occurring in their locality with relevant information such as:

* Problem title
* Category
* Description
* Location
* Landmark
* Supporting images
* Submission details

The prototype is currently focused on **Dhule District**.

---

### 2. 🤖 AI-Assisted Problem Intelligence

Samanvay uses AI to reduce manual effort and improve decision-making.

**AI capabilities include:**

* 🏷️ Problem classification
* 📝 Automatic problem summarization
* ⚡ Priority assessment
* 🎓 University/project matching
* 🏢 Industry matching
* 🔎 Similar-problem detection

The AI layer is designed around **LLMs, embeddings, similarity search, and weighted ranking** rather than training custom models.

---

### 3. ⚡ Priority-Based Problem Management

Problems are organized according to their societal impact and urgency.

| Priority           | Example                      |
| ------------------ | ---------------------------- |
| 🔴 **High**        | Electricity-related problems |
| 🟠 **Medium-High** | Water & sanitation           |
| 🟢 **Minimum**     | PWD & road development       |

This allows authorities and stakeholders to focus resources where they can create the greatest impact.

---

### 4. 🎓 University Collaboration

Universities receive dedicated workspaces for:

* Student management
* Faculty/mentor management
* Team formation
* Project allocation
* Project monitoring
* Student workspaces
* Faculty workspaces
* University administration

Real societal problems can therefore become **structured student projects with measurable outcomes**.

---

### 5. 🏢 Industry Collaboration

Industries can:

* Explore relevant societal projects
* View project requirements
* Identify suitable university teams
* Send collaboration requests
* Provide technical expertise
* Participate in solution development

This creates a bridge between **academic innovation and industry capability**.

---

### 6. 📊 End-to-End Project Tracking

Once a problem becomes a project, stakeholders can track:

* Project overview
* Team members
* Milestones
* Documents
* Progress
* Impact metrics
* Collaboration status

The goal is to move beyond simply **reporting problems** toward actually **solving them**.

---

## 🧠 AI Architecture

```text
Citizen Problem
       │
       ▼
┌──────────────────────┐
│   Problem Intake     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ AI Classification    │
└──────────┬───────────┘
           │
           ├──────────────► Summarization
           │
           ├──────────────► Priority Assessment
           │
           ├──────────────► Similarity Detection
           │
           ▼
┌──────────────────────┐
│ Matching Engine      │
├──────────────────────┤
│ University Matching  │
│ Industry Matching    │
└──────────┬───────────┘
           │
           ▼
   Solution Project
           │
           ▼
┌──────────────────────┐
│ Progress & Impact    │
│ Tracking             │
└──────────────────────┘
```

### AI Technology Approach

| Capability          | Approach                       |
| ------------------- | ------------------------------ |
| Classification      | LLM zero/few-shot prompting    |
| Summarization       | LLM abstractive summarization  |
| Priority            | Hybrid rules + LLM             |
| Duplicate detection | Embeddings + cosine similarity |
| University matching | Embeddings + weighted ranking  |
| Industry matching   | Embeddings + weighted ranking  |

---

## 🏗️ System Architecture

```text
                         SAMANVAY PORTAL
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
         Frontend           Backend          Database
          React             FastAPI          PostgreSQL
              │                │                │
              │                ├──── Auth      │
              │                ├──── Problems  │
              │                ├──── Projects  │
              │                ├──── Matching  │
              │                └──── AI        │
              │
              ▼
       Role-Based Workspaces
              │
     ┌────────┼────────┬──────────┐
     ▼        ▼        ▼          ▼
 Citizen  Government University Industry
```

---

## 🎨 Design System

Samanvay uses a soft, accessible visual language designed around collaboration and community.

### Color Palette

| Color              | Hex       |
| ------------------ | --------- |
| 🌸 Soft Background | `#FFF5F5` |
| 🌷 Light Pink      | `#F7D6D0` |
| 🌹 Rose            | `#E2B4BD` |
| 🩶 Primary Text    | `#4A4A4A` |

---

## 🖥️ Prototype Scope

The current prototype is intentionally scoped to:

> **📍 Dhule District, Maharashtra**

Instead of attempting to simulate an entire state or country, the prototype uses a **synthetic Dhule-based university, student, faculty, industry, and societal-problem dataset**.

This allows the complete ecosystem to be demonstrated realistically while keeping the prototype manageable.

---

## 👥 User Roles

### 👤 Citizen

* Location verification
* Problem reporting
* Problem history
* Problem status tracking
* Notifications
* Problem details

### 🏛️ Government Authority

* Problem validation
* AI-assisted classification
* Priority management
* Department routing
* Analytics
* Impact monitoring
* Notifications

### 🎓 Student

* Student workspace
* Assigned projects
* Team participation
* Project milestones
* Documents
* Progress tracking

### 👨‍🏫 Faculty / Mentor

* Student/team supervision
* Project monitoring
* Mentorship
* Project allocation
* Progress evaluation

### 🏢 University Authority

* University-wide project management
* Team management
* Faculty management
* Project allocation
* Institutional monitoring

### 🏢 Industry

* Industry profile
* Relevant project discovery
* Collaboration requests
* Technical contribution
* Project collaboration

---

## 📁 Project Structure

```text
samanvay-portal/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   ├── problems/
│       │   ├── dashboard/
│       │   ├── university/
│       │   ├── industry/
│       │   └── projects/
│       │
│       ├── pages/
│       │   ├── citizen/
│       │   ├── government/
│       │   ├── university/
│       │   ├── industry/
│       │   └── projects/
│       │
│       ├── layouts/
│       ├── context/
│       ├── services/
│       ├── data/
│       ├── utils/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── backend/
│   └── app/
│       ├── core/
│       ├── models/
│       ├── schemas/
│       ├── routes/
│       ├── services/
│       └── ai/
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── README.md
│
├── docs/
│   ├── project-overview.md
│   ├── api-documentation.md
│   └── demo-flow.md
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 🛠️ Technology Stack

### Frontend

* React
* React Router
* Vite
* Tailwind CSS
* Lucide Icons

### Backend

* Python
* FastAPI
* REST APIs
* JWT Authentication

### Database

* PostgreSQL
* Vector search / `pgvector` planned for AI matching

### AI

* LLM APIs
* Prompt engineering
* Embeddings
* Cosine similarity
* Vector search
* Weighted ranking

---

## 🔐 Security & Privacy

The project architecture includes:

* Role-based access
* JWT-based authentication
* Environment-based secrets
* Protected backend routes
* Separation of frontend and backend responsibilities

> 🔒 API keys and environment secrets are intentionally excluded from the repository.

---

## 🔄 Core Workflow

```text
1. Citizen
      │
      ▼
Report a Societal Problem
      │
      ▼
2. AI Processing
      │
      ├── Classification
      ├── Summary
      └── Priority
      │
      ▼
3. Government
      │
      ├── Validate
      └── Route
      │
      ▼
4. Matching Engine
      │
      ├── University
      └── Industry
      │
      ▼
5. Project Creation
      │
      ▼
6. Student + Faculty Team
      │
      ▼
7. Solution Development
      │
      ▼
8. Progress Tracking
      │
      ▼
9. Impact Measurement
```

---

## 📌 Current Development Status

### Phase 1 — UI Foundation

* [x] Location Gate
* [x] Landing Page
* [x] Login / Registration
* [x] Citizen Dashboard
* [x] Government Dashboard structure
* [x] University workspace structure
* [x] Industry workspace structure
* [x] Project workspace structure
* [x] Notification system structure

### Phase 2 — Backend

* [x] Backend project structure
* [x] Authentication structure
* [x] User models
* [x] Problem models
* [x] University models
* [x] Industry models
* [x] Project models
* [x] Notification models
* [ ] Complete API integration
* [ ] Database integration

### Phase 3 — AI

* [x] AI module architecture
* [x] Classification module
* [x] Summarization module
* [x] Embedding module
* [x] Matching modules
* [x] Priority engine structure
* [ ] Live LLM integration
* [ ] Production vector search

### Phase 4 — Demonstration

* [x] Dhule synthetic dataset
* [ ] Complete end-to-end integration
* [ ] Interactive maps
* [ ] Analytics refinement
* [ ] Final SIH demonstration flow

---

## 🌱 Why Samanvay?

Many societal problems are not difficult because solutions don't exist.

They are difficult because:

**the right problem → doesn't reach the right people → with the right resources → at the right time.**

Samanvay attempts to solve this coordination gap.

Instead of treating a complaint as the end of a process, the platform transforms it into a potential **collaborative innovation project**.

```text
Problem
   ↓
Understanding
   ↓
Prioritization
   ↓
Matching
   ↓
Collaboration
   ↓
Solution
   ↓
Impact
```

---

## 🎯 Long-Term Vision

The current prototype focuses on Dhule District, but the architecture is designed to scale toward:

* Multi-district deployment
* State-level implementation
* Real-time government integrations
* Advanced AI recommendations
* Geographic intelligence
* Mobile applications
* Payment and funding workflows
* Expanded university and industry networks
* Real-time impact analytics

---

## 👨‍💻 Team

# Team Samanvay

**Samanvay Portal — SIH 2026**

> *Building a bridge between society's problems and the people capable of solving them.*

---

## 📄 Documentation

Project documentation is available in the [`docs/`](./docs) directory:

* [Project Overview](./docs/project-overview.md)
* [API Documentation](./docs/api-documentation.md)
* [Demo Flow](./docs/demo-flow.md)

---

## ⭐ Project

If you find the idea useful, consider giving the repository a ⭐.

**Samanvay Portal**
*Read the problem. Connect the people. Build the solution.*
