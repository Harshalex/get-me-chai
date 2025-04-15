import User from "@/app/models/User";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import connectDB from "@/app/db/connectdb";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn Callback Triggered");
      console.log("User:", user);

      if (account.provider === "github") {
        try {
          await connectDB();
          console.log("Connected to Database");

          const email = user.email || profile.email; // Ensure email is defined
          const currentUser = await User.findOne({ email: email });
          console.log("Current User:", currentUser);

          if (!currentUser) {
            console.log("No User Found, Creating New User", email);
            const newUser = new User({
              email: email,
              username: email.split("@")[0],
            });
            await newUser.save();
            console.log("New User Created:", newUser);
            user.name = newUser.username;
          } else {
            console.log("User Found:", currentUser);
            user.name = currentUser.username;
          }
        } catch (error) {
          console.error("Database Connection Error:", error);
          return false; // Return false to indicate sign-in failure
        }
        return true;
      }
    },
    async session({ session, token, user }) {
      try {
        const dbUser = await User.findOne({ email: session.user.email });
        console.log("DB User:", dbUser);
        session.user.name = dbUser.username;
      } catch (error) {
        console.error("Error in session callback:", error);
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export const GET = async (req, res) => handler(req, res);
export const POST = async (req, res) => handler(req, res);