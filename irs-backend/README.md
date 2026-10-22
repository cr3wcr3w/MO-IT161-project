# Backend Documentation 
- services/routes should have different folder code so that if we need to create another service and remove the existing backend we can easily do it without doing a huge refactoring 
  - for example; if we need to create another service for email service, we can asily do that by copying the v1/email then nothing changes and the existing backend is still working
  - we use versiontinig and single respontibility to do this
# naming convention inside of version, you dont need to follow the existing format like <sample>.service, <sample>.controller, <sample>.route, <sample>.schema
# in POST request, make sure you validate using zod as middlware
# follow reponse format 
{data: <obj> | null, status: <status>}