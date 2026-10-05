"use client";

import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@/firebaseConfig";

/**
 * ============================================================================
 * AUTHENTICATION GLOBAL PROVIDER
 * ============================================================================
 *
 * PURPOSE:
 * ----------------------------------------------------------------------------
 * This file creates a React Context that makes the currently authenticated
 * Firebase user available to any Client Component in the application.
 *
 * Without this Context, we would have to check Firebase authentication
 * separately inside every page/component that needs user information.
 *
 * For example, without this provider:
 *
 *   Dashboard -> check Firebase user
 *   Profile   -> check Firebase user
 *   Settings  -> check Firebase user
 *   Navbar    -> check Firebase user
 *
 * This would result in repeated authentication-related code.
 *
 * Instead, this file checks the authentication state once and stores the
 * result in React Context.
 *
 * Then any component can simply use:
 *
 *   const { userData, loadingUserData } = useAuthGlobalProvider();
 *
 * and get access to the current user.
 *
 *
 * ============================================================================
 * IMPORTANT CONCEPT
 * ============================================================================
 *
 * Firebase Authentication remembers the signed-in user according to its
 * configured persistence.
 *
 * Therefore, when the user opens the website again, Firebase may restore the
 * previously authenticated user.
 *
 * However, Firebase needs a little time to determine whether a user is
 * currently signed in or not.
 *
 * That's why we have:
 *
 *   userData
 *   loadingUserData
 *
 *
 * `userData`
 * ----------------------------------------------------------------------------
 * Stores the currently authenticated Firebase user.
 *
 * If a user is signed in:
 *
 *   userData = Firebase User object
 *
 * If nobody is signed in:
 *
 *   userData = null
 *
 * Example:
 *
 *   userData = {
 *     uid: "abc123",
 *     displayName: "John Doe",
 *     email: "john@example.com",
 *     photoURL: "https://..."
 *   }
 *
 *
 * `loadingUserData`
 * ----------------------------------------------------------------------------
 * Tells the application whether Firebase is still checking the user's
 * authentication state.
 *
 * Initially:
 *
 *   loadingUserData = true
 *
 * After Firebase finishes checking:
 *
 *   loadingUserData = false
 *
 * This is important because `userData === null` does NOT necessarily mean
 * that the user is logged out.
 *
 * It might simply mean that Firebase has not finished checking yet.
 *
 * Example:
 *
 *   Page opens
 *       ↓
 *   Firebase checks authentication
 *       ↓
 *   loadingUserData = true
 *       ↓
 *   Firebase finds the previously signed-in user
 *       ↓
 *   userData = current Firebase User
 *   loadingUserData = false
 *
 *
 * ============================================================================
 * AUTHENTICATION STATE LISTENER
 * ============================================================================
 *
 * The following useEffect runs once when the AuthProvider component is
 * mounted:
 *
 *   useEffect(() => {
 *
 *     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
 *
 *       setUserData(currentUser);
 *       setLoadingUserData(false);
 *
 *     });
 *
 *     return () => unsubscribe();
 *
 *   }, []);
 *
 *
 * ----------------------------------------------------------------------------
 * WHY `useEffect`?
 * ----------------------------------------------------------------------------
 *
 * `onAuthStateChanged()` creates a listener that listens for changes in the
 * Firebase Authentication state.
 *
 * Setting up such a listener is a side effect, so we put it inside
 * `useEffect()`.
 *
 * The empty dependency array:
 *
 *   []
 *
 * means this effect is set up when the AuthProvider is mounted.
 *
 *
 * ============================================================================
 * `onAuthStateChanged(auth, callback)`
 * ============================================================================
 *
 * `onAuthStateChanged()` is a Firebase Authentication listener.
 *
 * It tells us when Firebase determines the current authentication state.
 *
 * It receives two important things:
 *
 *   1. `auth`
 *      The Firebase Authentication instance from firebaseConfig.js.
 *
 *   2. A callback function
 *      Firebase calls this function whenever the authentication state is
 *      determined or changes.
 *
 * The callback receives:
 *
 *   currentUser
 *
 * `currentUser` is:
 *
 *   Firebase User object -> if a user is signed in
 *
 *   null                -> if no user is signed in
 *
 *
 * ============================================================================
 * INPUT → OUTPUT EXAMPLE
 * ============================================================================
 *
 * Example 1: User is already signed in
 *
 * INPUT:
 *
 *   Firebase checks the authentication state.
 *
 * OUTPUT:
 *
 *   currentUser = {
 *     uid: "abc123",
 *     displayName: "John Doe",
 *     email: "john@example.com"
 *   }
 *
 * Then:
 *
 *   setUserData(currentUser);
 *
 * stores that Firebase User object in React state.
 *
 * So:
 *
 *   userData = currentUser
 *
 *
 * Example 2: User is not signed in
 *
 * INPUT:
 *
 *   Firebase checks the authentication state.
 *
 * OUTPUT:
 *
 *   currentUser = null
 *
 * Then:
 *
 *   setUserData(null);
 *
 * So:
 *
 *   userData = null
 *
 *
 * ============================================================================
 * `setUserData(currentUser)`
 * ============================================================================
 *
 * This stores the Firebase user's information in our React state.
 *
 * If the user is signed in:
 *
 *   setUserData(currentUser)
 *
 * If the user signs out:
 *
 *   setUserData(null)
 *
 * This means the rest of the application can always use `userData` to know
 * who the currently authenticated Firebase user is.
 *
 *
 * ============================================================================
 * `setLoadingUserData(false)`
 * ============================================================================
 *
 * This tells the application:
 *
 *   "Firebase has finished checking the authentication state."
 *
 * Initially:
 *
 *   loadingUserData = true
 *
 * After Firebase gives us the authentication result:
 *
 *   loadingUserData = false
 *
 * This prevents us from incorrectly treating a user as logged out while
 * Firebase is still restoring/checking the authentication state.
 *
 *
 * ============================================================================
 * WHY DO WE NEED `loadingUserData`?
 * ============================================================================
 *
 * Imagine a user has already signed in with Google.
 *
 * When the user opens `/dashboard`, Firebase may need a short amount of time
 * to restore/check the authentication state.
 *
 * During that short period:
 *
 *   userData = null
 *   loadingUserData = true
 *
 * If we only checked:
 *
 *   if (!userData) {
 *     router.replace("/");
 *   }
 *
 * we could incorrectly redirect the user to the home page before Firebase
 * finishes checking.
 *
 * Therefore, we first wait until:
 *
 *   loadingUserData === false
 *
 * and only then decide whether the user is authenticated.
 *
 *
 * ============================================================================
 * CLEANUP FUNCTION
 * ============================================================================
 *
 * `onAuthStateChanged()` returns a function that can stop/unsubscribe the
 * authentication listener.
 *
 * We store that function in:
 *
 *   const unsubscribe = onAuthStateChanged(...);
 *
 * Then we return:
 *
 *   return () => unsubscribe();
 *
 * React calls this cleanup function when the AuthProvider is removed/unmounted.
 *
 * This is important because we don't want an old authentication listener to
 * continue running after the component is gone.
 *
 *
 * In simple terms:
 *
 *   Subscribe to Firebase
 *          ↓
 *   Listen for authentication changes
 *          ↓
 *   Component is removed
 *          ↓
 *   Unsubscribe from Firebase
 *
 *
 * ============================================================================
 * WHY IS AUTHENTICATION PUT IN REACT CONTEXT?
 * ============================================================================
 *
 * React Context allows us to share data with many components without passing
 * that data manually through props.
 *
 * For example, our application might contain:
 *
 *   AuthProvider
 *       │
 *       ├── Home
 *       ├── Dashboard
 *       ├── Profile
 *       ├── Navbar
 *       └── Settings
 *
 * Because these components are inside AuthProvider, they can access:
 *
 *   userData
 *   loadingUserData
 *
 * without receiving them as props.
 *
 *
 * ============================================================================
 * EXAMPLE OF USING THE GLOBAL AUTH DATA
 * ============================================================================
 *
 * Inside another Client Component:
 *
 *   "use client";
 *
 *   import { useAuthGlobalProvider } from "@/components/AuthProvider";
 *
 *   export default function Profile() {
 *     const { userData, loadingUserData } =
 *       useAuthGlobalProvider();
 *
 *     if (loadingUserData) {
 *       return <p>Loading...</p>;
 *     }
 *
 *     if (!userData) {
 *       return <p>Please sign in.</p>;
 *     }
 *
 *     return (
 *       <div>
 *         <h1>{userData.displayName}</h1>
 *         <p>{userData.email}</p>
 *       </div>
 *     );
 *   }
 *
 *
 * INPUT:
 *
 *   Firebase user:
 *
 *   {
 *     displayName: "John Doe",
 *     email: "john@example.com"
 *   }
 *
 * OUTPUT:
 *
 *   John Doe
 *   john@example.com
 *
 *
 * ============================================================================
 * AUTH CONTEXT
 * ============================================================================
 */
const AuthContext = createContext();


/**
 * ============================================================================
 * `AuthProvider`
 * ============================================================================
 *
 * This component provides the authentication data to all components rendered
 * inside it.
 *
 * It receives:
 *
 *   children
 *
 * `children` represents everything placed inside <AuthProvider>.
 *
 * Example:
 *
 *   <AuthProvider>
 *     <Home />
 *     <Dashboard />
 *     <Profile />
 *   </AuthProvider>
 *
 * Here, Home, Dashboard, and Profile are the `children`.
 *
 * The provider then makes this data available to those components:
 *
 *   {
 *     userData,
 *     loadingUserData
 *   }
 *
 * ============================================================================
 */
export function AuthProvider({ children }) {

  const [userData, setUserData] = useState(null);

  const [loadingUserData, setLoadingUserData] = useState(true);

  /**
   * ==========================================================================
   * LISTEN FOR FIREBASE AUTHENTICATION CHANGES
   * ==========================================================================
   *
   * `useEffect()` runs this code when AuthProvider is mounted.
   *
   * `onAuthStateChanged()` asks Firebase to notify us about the current
   * authentication state.
   *
   * The callback receives `currentUser`.
   *
   * If the user is authenticated:
   *
   *   currentUser = Firebase User object
   *
   * If the user is not authenticated:
   *
   *   currentUser = null
   *
   * We then store that value in `userData`.
   *
   * Finally, we set `loadingUserData` to false because Firebase has finished
   * checking the authentication state.
   *
   * Example:
   *
   *   Firebase finds logged-in user
   *              ↓
   *   currentUser = user object
   *              ↓
   *   setUserData(currentUser)
   *              ↓
   *   userData now contains the user
   *              ↓
   *   setLoadingUserData(false)
   *
   *
   * `unsubscribe` is the cleanup function returned by
   * `onAuthStateChanged()`.
   *
   * React calls:
   *
   *   unsubscribe()
   *
   * when AuthProvider is unmounted.
   *
   * This removes the Firebase authentication listener.
   */
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUserData(currentUser);

      setLoadingUserData(false);

    });

    return () => unsubscribe();

  }, []);


  /**
   * ==========================================================================
   * PROVIDE AUTH DATA TO CHILD COMPONENTS
   * ==========================================================================
   *
   * `AuthContext.Provider` makes the following values available to all
   * components inside AuthProvider:
   *
   *   userData
   *   loadingUserData
   *
   * Example:
   *
   *   <AuthProvider>
   *     <Dashboard />
   *   </AuthProvider>
   *
   * Dashboard can access:
   *
   *   userData
   *   loadingUserData
   *
   * through `useAuthGlobalProvider()`.
   */
  return (
    <AuthContext.Provider value={{ userData, loadingUserData }}>

      {children}

    </AuthContext.Provider>
  );
}


/**
 * ============================================================================
 * `useAuthGlobalProvider`
 * ============================================================================
 *
 * This is a custom React Hook created to make accessing AuthContext easier.
 *
 * `useContext(AuthContext)` retrieves the value currently provided by:
 *
 *   <AuthContext.Provider
 *     value={{ userData, loadingUserData }}
 *   >
 *
 * Therefore, when we write:
 *
 *   const { userData, loadingUserData } =
 *     useAuthGlobalProvider();
 *
 * we are effectively getting:
 *
 *   {
 *     userData,
 *     loadingUserData
 *   }
 *
 * from AuthContext.
 *
 *
 * ============================================================================
 * WHY CREATE THIS CUSTOM HOOK?
 * ============================================================================
 *
 * We could directly write:
 *
 *   const authData = useContext(AuthContext);
 *
 * in every component.
 *
 * But creating:
 *
 *   useAuthGlobalProvider()
 *
 * gives us a cleaner and more meaningful API.
 *
 * Instead of knowing that our application uses a context called
 * `AuthContext`, other components only need to know:
 *
 *   "I want the global authentication data."
 *
 * So they can simply write:
 *
 *   const { userData, loadingUserData } =
 *     useAuthGlobalProvider();
 *
 *
 * ============================================================================
 * INPUT → OUTPUT EXAMPLE
 * ============================================================================
 *
 * INPUT:
 *
 *   A component calls:
 *
 *   const { userData, loadingUserData } =
 *     useAuthGlobalProvider();
 *
 * OUTPUT:
 *
 *   {
 *     userData: <Firebase User object or null>,
 *     loadingUserData: true or false
 *   }
 *
 *
 * Example when the user is signed in:
 *
 *   {
 *     userData: {
 *       uid: "abc123",
 *       displayName: "John Doe",
 *       email: "john@example.com"
 *     },
 *     loadingUserData: false
 *   }
 *
 *
 * Example when the user is signed out:
 *
 *   {
 *     userData: null,
 *     loadingUserData: false
 *   }
 *
 *
 * IMPORTANT:
 * ----------------------------------------------------------------------------
 * A component using this hook must be rendered somewhere inside
 * <AuthProvider>.
 *
 * For example:
 *
 *   <AuthProvider>
 *     <Dashboard />
 *   </AuthProvider>
 *
 * If Dashboard is outside AuthProvider, it will not receive the context
 * provided by this AuthContext.
 *
 *
 * ============================================================================
 * FINAL FLOW OF THIS FILE
 * ============================================================================
 *
 * 1. AuthProvider is rendered.
 *
 * 2. `userData` starts as:
 *
 *      null
 *
 * 3. `loadingUserData` starts as:
 *
 *      true
 *
 * 4. `useEffect()` runs.
 *
 * 5. `onAuthStateChanged()` starts listening to Firebase Authentication.
 *
 * 6. Firebase checks whether a user is authenticated.
 *
 * 7. Firebase provides `currentUser`.
 *
 *      Signed in  -> Firebase User object
 *      Signed out -> null
 *
 * 8. `setUserData(currentUser)` stores the result.
 *
 * 9. `setLoadingUserData(false)` tells the application that the check is
 *    complete.
 *
 * 10. AuthContext provides:
 *
 *       {
 *         userData,
 *         loadingUserData
 *       }
 *
 * 11. Any component inside AuthProvider can access these values through:
 *
 *       useAuthGlobalProvider()
 *
 * 12. When AuthProvider is unmounted, `unsubscribe()` removes the Firebase
 *     authentication listener.
 *
 *
 * In one simple sentence:
 *
 * This file creates a global authentication system that listens to Firebase,
 * stores the current user and authentication-loading state, and makes both
 * values available to any component through a custom React Hook.
 *
 * ============================================================================
 */
export function useAuthGlobalProvider() {

  return useContext(AuthContext);
  
}
