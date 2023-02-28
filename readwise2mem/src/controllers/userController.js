const createNewUser = async (email, password) => {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  console.log("user created");
};
const loginUser = async (email, password) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log("logged in");
};

const getInfoUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("current user is : " + user);
};
