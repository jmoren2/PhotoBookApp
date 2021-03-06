import { API, graphqlOperation } from 'aws-amplify'
import { createAlbum as createAlbumMutation } from '@/graphql/mutations'
import { getAlbum as getAlbumQuery } from '@/graphql/queries'
import { listAlbums as listAlbumsQuery } from '@/graphql/queries'

export const albumInfo = {
    namespaced: true,
    state: {error: null, albums: null},
    mutations: {
        setAlbums ( state, payload){
            state.albums = payload
        }
    },
    actions: {
        async createAlbum( {dispatch}, newAlbum){
            try{
                await API.graphql( graphqlOperation( createAlbumMutation, { input: newAlbum } ) )
                dispatch("getAlbumsData")
            }catch(error){
                console.log("create album error ", error)
            }
        },
        async getAlbum(_, albumId){
            try{
                return await API.graphql( graphqlOperation( getAlbumQuery, { id: albumId }) )
            }catch(error){
                console.log('get album error ', error)
            }
        },
        async getAlbumsData( { commit }){
            const albumsData = await API.graphql( graphqlOperation ( listAlbumsQuery ))
            commit("setAlbums", albumsData.data.listAlbums.items )
        }
    },
    getters:{
        albums: (state) => state.albums 
    }
}