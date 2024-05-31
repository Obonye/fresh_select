import { createClient } from "@/utils/supabase/client";

let supabase =createClient()
class ProfileController{

    async fetchProfile() {
        try {
          const data = await supabase.rpc("get_current_vendor").select();
          console.log(data)
          return data;
        } catch (e) {
          console.log("error fetching data", e);
        }
      }

      fetchPicture = async (vendorID, profilePicture) => {
        const { data, error } = supabase.storage
            .from("profile_images")
            .getPublicUrl(`${vendorID}/${profilePicture}`);
    
        if (error) {
          console.error("Error getting public URL:", error);
        } else {
          console.log("Public URL:", data.publicUrl);
          return data.publicUrl;
        }
      };
      fetchHero = async (vendorID, heroPicture) => {
        const { data, error } = supabase.storage
            .from("hero_images")
            .getPublicUrl(`${vendorID}/${heroPicture}`);
        if (error) {
          console.error("Error getting public URL:", error);
        } else {
          console.log("Public URL:", data.publicUrl);
          return data.publicUrl;
        }
      };

      updateProfile=async({vendorID,vendorName,vendorType,location,description})=>{
        const {error}=await supabase.from('vendors').update({'vendorName':vendorName,'vendor_type':vendorType, 'location':location, 'description':description}).match({'id':vendorID});

        if(error){
          console.log(error)
          toast.error('oops something went wrong')
        }
        toast.success('profile updated successfully')
      }
}
export default ProfileController