# Capstone-2: Seller's Disclosure
Heroku Link:
Schema Design: https://drive.google.com/file/d/1AnwWF3ZweGM3GEMN6yQpKIEJD0Yu2iwg/view?usp=sharing

## Description
This website allows users to digitally save information found in a homeowner's Seller's Disclosure Document.
I was motivated to build this application after finding that updating my own Seller's Disclosure paperwork was a tedious task.
It was my goal to make the experience easier and more streamlined.

## Local Installation
Run the following commands from the Linux terminal:

1.  Install Requirements:
    pip install -r requirements.txt

2.  Start PostgreSQL locally:
    sudo service postgresql start

3.  Delete and Create all tables:
    python seed.py

4.  Seed the database
    psql < capstone-seed.sql

5.  Start the backend:
    flask run

6.  Start the frontend:
    npm start

## Features
Login/Logout Functionality
Registration Functionality
User-Friendly UI for ease of use
Privacy Routes for privacy and security
Hashed Passwords for security
PDF Export option

## Usage
Login or Register
Create a New Household
Enter basic household information
Navigate to "View Household Detail"
Navigate to each tab to enter additional information about the household
Navigate to "Back to Households"
Click "Download" to view a PDF of your household information
Click "Export PDF" to view a finalized PDF of your household information before downloading

## Made With
https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue