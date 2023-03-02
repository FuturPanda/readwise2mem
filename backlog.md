## ToDo :

- how to not create mem when highlights == 0 ?

1. Import All Fonction
2. catch error, and handle status
3. Templating
4. Auto Sync ?
5. Reset db button

## Templating

1. Reader's import note's highlight = undefined ?

## Improvements :

1. Error messages for login
2. Status messages for import sucess / error
3. ui design for input when editState true
4. login on key enter when input password && stop propagation
5. Use State for lastFetched.

## Continous :

1. transfer all js as rest api on vercel serverless functions to be able to run continous api requests
   //////
   useEffect(() => {
   if (importStatusState) {
   const intervToSet = setInterval(() => {
   console.log("intervId");
   fetchReadwise();
   }, 6000);
   setIntervId(intervToSet);
   } else if (!importStatusState) clearInterval(intervId);
   }, [importStatusState]);
   /////
