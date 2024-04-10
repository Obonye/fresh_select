import { createClient } from "@/utils/supabase/client";

let supabase = createClient();
class AuthController {
  async getUser(setUser) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (user) {
      setUser(user);
    }
  }
  async setUpEmailAndPassword(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.log(error);
      return "Error Signing up", error;
    } else {
      //sawait supabase.from('vendors').insert({role:'vendor'}).eq("id",supabase.auth.getUser().uid)
      console.log(supabase.auth.getSession().session.user);
      return "Sign up successful";
    }
  }

  completeSignUp = async (userID) => {
    await supabase
      .from("profile")
      .update({ sign_up_complete: true })
      .eq("id", userID);
  };

  handleRegister = async (
    email,
    password,
    myUser,
    confirmPassword,
    companyName,
    location,
    type,
    profilePicture,
    heroImage,
    step,
    setStep,
    setUser
  ) => {
    if (step === 1) {
      if (password !== confirmPassword) {
        return "Your passwords do not match";
      }

      try {
        const { user, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          console.error("Registration error:", error);
          return;
        }
        if (user) {
          console.log(user);
          this.getUser(setUser);
        }

        setStep(2);
      } catch (error) {
        console.error("Registration error:", error);
        return;
      }
    } else if (step === 2) {
      if (!companyName || !location || !type) {
        return "Please fill in all the required fields";
      }

      try {
        const { data, error } = await supabase.from("vendors").insert({
          user_id: myUser.id,
          vendor_name: companyName,
          location,
          vendor_type: type,
        });

        if (error) {
          console.error("Error inserting vendor details:", error);
          return;
        }

        setStep(3);
      } catch (err) {
        console.error("Error:", err);
        return;
      }
    } else if (step === 3) {
      if (!profilePicture || !heroImage) {
        return "Please select your profile and background image";
      }

      try {
        // Upload profile picture
        const profilePicturePath = `${myUser.id}/${profilePicture.name}`;
        const { data: profilePictureData, error: profilePictureError } =
          await supabase.storage
            .from("profile_images")
            .upload(profilePicturePath, profilePicture);

        if (profilePictureError) {
          console.error("Profile picture upload error:", profilePictureError);
          return;
        }

        // Upload hero image
        const heroImagePath = `${myUser.id}/${heroImage.name}`;
        const { data: heroImageData, error: heroImageError } =
          await supabase.storage
            .from("hero_images")
            .upload(heroImagePath, heroImage);

        if (heroImageError) {
          console.error("Hero image upload error:", heroImageError);
          return;
        }

        // Update vendors table with image URLs
        const { error: updateError } = await supabase
          .from("vendors")
          .update({
            profile_picture: profilePicture.name,
            hero_image: heroImage.name,
          })
          .eq("id", myUser.id);

        if (updateError) {
          console.error("Error updating vendor details:", updateError);
          return;
        }

        // Complete sign-up
        await completeSignUp(myUser.id);
        return "Sign up Complete";
      } catch (err) {
        console.error("Error:", err);
        return;
      }
    }
  };
}
export default AuthController;
