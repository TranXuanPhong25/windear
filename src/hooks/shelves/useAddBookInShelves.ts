import {useAuth0} from "@auth0/auth0-react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {AddBookToShelfPayload} from "@/models/AddBookToShelfPayload";

export function useAddBookInShelves() {
    const {user, getAccessTokenSilently} = useAuth0();
    return useMutation({
        mutationFn: async (payload:AddBookToShelfPayload) => {
            if (!user?.sub) {
                throw new Error('User is not authenticated');
            }
            const accessToken = await getAccessTokenSilently();
            const addBookToShelfUrl = `${import.meta.env.VITE_BASE_API_URL}/shelves/${encodeURIComponent(user.sub)}`;
            const response = await axios.request(
                {
                    method: "POST"   ,
                    url: addBookToShelfUrl,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: payload
                }
            ).then(response => response.data);
            return response.ticket;
        }
    });
}
