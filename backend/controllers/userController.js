const { dataTool } = require("echarts");
const { default: supabase } = require("../supabase/supabaseClient");

const userController = {};

// middleware to add user to supabase db
userController.createUser = async (req, res, next) => {
  try {
    const username =  req.body.username;
    const password = req.body.password; 
    const email = req.body.email;
    const { error } = await supabase
    .from('users')
    .insert({ username: username, password: password, email: email })
  if (error) {
    throw (error)
  }  
  return data;
  } catch (err) {
    const errObj = {
        log: `Create user failed: ${err}`,
        message: { err: 'create user failed, check server log for details' },
    }
    return next(errObj);
  }
}