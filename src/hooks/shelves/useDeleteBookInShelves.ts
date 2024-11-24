import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {DeleteBookInShelvesPayload} from "@/models/DeleteBookInShelvesPayload";

export function useDeleteBookInShelves() {
    const {user, getAccessTokenSilently} = useAuth0();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload:DeleteBookInShelvesPayload) => {
            if (!user?.sub) {
                throw new Error('User is not authenticated');
            }
            const accessToken = await getAccessTokenSilently();
            const addBookToShelfUrl = `${import.meta.env.VITE_BASE_API_URL}/shelves/${encodeURIComponent(user.sub)}/book`;
            await axios.request(
                {
                    method:"DELETE"   ,
                    url: addBookToShelfUrl,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: payload
                }
            ).then(response => response.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['shelves', user?.sub]});
        }
    });
}
