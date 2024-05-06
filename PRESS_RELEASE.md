<!-- Replace with your project name and delete me -->
# Project Name 

Authors: 
<!-- Replace Name with your names -->
- Maya Ramkishun
- Dominic Tuzo
- Aaron Castillo

Team Name: 

## 😞 The Problem 
<!-- content goes below -->
Asthma, a persistent lung condition, causes wheezing, shortness of breath, tightness in the chest, and coughing. When inadequately managed, it significantly reduces quality of life and can lead to unnecessary illness and death. Young people of color who come from lower socio-economic backgrounds in NYC have a higher chance of developing or having asthma than children living in different areas within NYS due to poor working/housing conditions. The poor working/housing conditions contain higher levels of indoor pollutants, such as dust mites and tobacco smoke, which contribute to the development or triggering of asthma. Many families cannot relocate due to not being able to afford better housing or to work in better workspaces.
<!-- content goes above -->

## 📝 Summary
<!-- content goes below -->
According to research from the CDC, 1 in 13 people have asthma, which is the leading chronic disease amongst children. Asthma can lead to frequent wheezing, shortness of breath, chest tightness, and coughing, often interfering with daily activities, sleep, and exercise. This persistent illness can negatively impact the quality of life of: 
- Blacks and Hispanics are the leading races for asthma in NYC. 
- Children 5-14 experience the most asthma attacks
- Black people experienced the most asthma-related deaths in the year 2020 (about 29 million)
<!-- content goes above -->

## 🤔 Our Hypothesis
<!-- content goes below -->
If people had better access to doctors and resources for treating asthma, then people who suffer from those chronic health conditions would have a better quality of life, thus reducing the prevalence of these conditions within the communities affected.
<!-- content goes above -->

## 📱 Product Overview
<!-- content goes below -->
The product will give users accurate contact information and resources from asthma specialists to easily find solutions to their chronic health conditions.
<!-- content goes above -->

## 🏙️  Mission Statement 
<!-- content goes below -->
Our website provides a forum for people with asthma and parents of asthmatic children to give user experiences, breakthroughs, struggles, and emotional support and allows users to find a pulmonologist within the NYC area.
<!-- content goes above -->

## 🫂 Who do we serve?
<!-- content goes below -->
We serve individuals in the NYC Area who suffer from asthma and parents or guardians of asthmatic children.
<!-- content goes above -->

## 🧳 User Journey Map
<!-- content goes below -->
<img width="2528" alt="Civic Tech Hackathon" src="https://github.com/Wheeze-Watchers/wheeze-watchers-civic-tech/assets/68202891/55664ff1-494a-486c-bb37-eb7349575220">
<!-- content goes above -->

## 👥 User-stories
<!-- content goes below -->
**User Story 1:** As a user who struggles with asthma, a parent of a child who struggles with asthma, or a health professional specializing in asthma and its effects, I can register as a member of the site or as an expert.
- A user can see the login/register button on the home page of our site
- Member and Expert registration requires the user’s first name, last name, email or phone number, username, and password—automatically generated ID.
- **Tables needed:**
  - user - (id*, first_name, last_name, email/phone number, username, password)

**User Story 2:** As a registered user, I can interact with any users’ posts on the website.
- A user can read member and expert posts, comment on them, create their own post, and delete them.
- Users must be logged in to create, comment, and delete posts.
- **Tables needed:**
  - (id*, username) from user table
  - post - (id*, title, body, user_id, timestamp)
  - thread - (id*, post_user_id, timestamp)

**User Story 3:** As a visitor (not logged in), I can view the website and its features.
- A visitor can only read the context of the Home and Discussion pages.
- A visitor can view 3 posts/threads max
- **Tables needed:**
  - (id*, username) from user table
  - post - (id*, title, body, user_id, timestamp)
  - thread - (id*, post_user_id, timestamp)

**User Story 4:** As a registered expert, I can provide resources to the resource page.
- An expert can provide resources such as contact information.
- **Tables needed:**
  - (id*, username) from user table
  - resource - (id*, user_id, title, body, URL)
<!-- content goes above -->

## 🧗‍♂️ Key Technical Challenge
<!-- content goes below -->
- Finding the appropriate and valid resources for this application.
  - Collecting all the resources and managing the information.
- Creating the “Finding Specialist” feature: Find asthma doctors (pulmonologists) in the NYC area.
<!-- content goes above -->

## 🏋🏽 Extension Opportunities 
<!-- content goes below -->
- About Page
- FAQ Page
- Direct Messaging
- Users can find doctors near them
<!-- content goes above --> 

## 📒 Sources
<!-- content goes below -->
- https://www.cdc.gov/asthma/default.htm 
- https://www.aad.org/public/diseases/eczema 
- https://nationaleczema.org/eczema/children/ 
- https://www1.nyc.gov/site/doh/data/data-publications/health-survey.page 
- https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4110514/
- https://www.health.ny.gov/statistics/ny_asthma/pdf/2018-2019_asthma_burden_nyc.pdf 
<!-- content goes above -->
