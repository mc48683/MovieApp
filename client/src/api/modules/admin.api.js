import privateClient from "../client/private.client.js";
import publicClient from "../client/public.client.js";

const adminEndpoints = {
    users: "dashboard/allusers",
    reviews: "dashboard/allreviews",
    getUserReviews: ({ userId }) => `dashboard/allusers/${userId}`,
    getDisplayName: ({ userId }) => `dashboard/allreviews/${userId}`,
    removeUser: ({ userId }) => `dashboard/allusers/${userId}`,
    removeReview: ({ reviewId }) => `dashboard/allreviews/${reviewId}`,
}


const adminApi = {
    getUsers: async () => {
        try {
            const response = await privateClient.get(adminEndpoints.users);
            return { response } 
        } catch (err) { 
            return { err }
        }
    },
    getUserReviews: async ({ userId }) => {
        try {
            const response = await privateClient.get(adminEndpoints.getUserReviews({ userId }));
            return { response } 
        } catch (err) { 
            return { err }
        }

    },
    getReviews: async () => {
        try {
            const response = await privateClient.get(adminEndpoints.reviews)
            return { response };
        } catch (err) { 
            return { err };
        }
    },
    getDisplayName: async ({ userId }) => {
        try {
            const response = await privateClient.get(adminEndpoints.getDisplayName({ userId }))
            return { response };
        } catch (err) { 
            return { err };
        }
    },
    removeUser: async ({ userId }) => {
        try {
            const response = await privateClient.delete(adminEndpoints.removeUser({ userId }));
            return { response };
        } catch (err) { 
            return { err };}
    },
    removeReview: async ({ reviewId }) => {
        try {
            const response = await privateClient.delete(adminEndpoints.removeReview({ reviewId }));
            return { response };
        } catch (err) { 
            return { err };}
    },
}

export default adminApi;