"use client"
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
    return configureStore({
        reducer: {
            sopon: (state = { name: "Sopon" }, action) => state,
            rokeya: (state = { name: "Rokeya" }, action) => state,
        }
    })
}