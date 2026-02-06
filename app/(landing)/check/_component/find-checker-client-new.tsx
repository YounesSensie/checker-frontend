"use client"

import { useEffect, useState, useCallback } from "react"
import CheckerSearchBox from "./checker-search-box"
//import CheckerSidebar from "./checker-sidebar"
import CheckerTopFilter from "./checker-top-filter"
import CheckerResults from "./checker-results"
//import CheckerPagination from "./checker-pagination"
import LoadingComponent from "./loading-compoent"
import CheckerSidebar from "./checker-sidebar-new"
import CheckerPagination from "./checker-pagination-new"

interface Checker {
  id: number
  name: string
  profileImage: string
  rating: number
  reviews: number
  experience: string
  specialties: string[]
  location: {
    country: string
    city: string
    region: string
  }
  coverageArea: string
  languages: string[]
  price: number
  responseTime: string
  description: string
  verified: boolean
  completedChecks: number
}

interface FindCheckerClientProps {
  initialCountry?: string
  initialCity?: string
  initialAccommodation?: string
}

export default function FindCheckerClient({
  initialCountry = "",
  initialCity = "",
  initialAccommodation = "",
}: FindCheckerClientProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<Checker[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    country: initialCountry,
    city: initialCity,
    accommodation: initialAccommodation,
    minRating: 0,
    priceMin: 0,
    priceMax: 10000,
  })

  const fetchCheckers = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        country: filters.country,
        city: filters.city,
        accommodation: filters.accommodation,
        page: currentPage.toString(),
        limit: "20",
        minRating: filters.minRating.toString(),
        priceMin: filters.priceMin.toString(),
        priceMax: filters.priceMax.toString(),
      })

      const response = await fetch(`/api/find-checker?${params}`)
      const data = await response.json()
      
      setSearchResults(data.data || [])
      setTotalResults(data.total || 0)
    } catch (error) {
      console.error("Error fetching checkers:", error)
      setSearchResults([])
      setTotalResults(0)
    } finally {
      setIsLoading(false)
    }
  }, [filters, currentPage])
// Initial load - ALWAYS fetch on component mount
  useEffect(() => {
    fetchCheckers()
  }, [])
  
  // Initial load when component mounts or initial params change
  //Fetch when filters change (but not on initial mount)
  useEffect(() => {
    setCurrentPage(1)
    fetchCheckers()
  }, [filters])

  // Fetch when page changes
  useEffect(() => {
    fetchCheckers()
  }, [currentPage])

  // Fetch when page changes
  useEffect(() => {
    if (filters.country || filters.city) {
      fetchCheckers()
    }
  }, [currentPage])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getLocationString = () => {
    if (filters.city && filters.country) {
      return `${filters.city}, ${filters.country}`
    } else if (filters.country) {
      return filters.country
    }
    return "Worldwide"
  }

  const getPageTitle = () => {
    if (filters.country && filters.city && filters.accommodation) {
      return `${filters.accommodation.charAt(0).toUpperCase() + filters.accommodation.slice(1)} Checkers in ${filters.city.charAt(0).toUpperCase() + filters.city.slice(1)}, ${filters.country.charAt(0).toUpperCase() + filters.country.slice(1)}`
    } else if (filters.country && filters.city) {
      return `Accommodation Checkers in ${filters.city.charAt(0).toUpperCase() + filters.city.slice(1)}, ${filters.country.charAt(0).toUpperCase() + filters.country.slice(1)}`
    } else if (filters.country) {
      return `Accommodation Checkers in ${filters.country.charAt(0).toUpperCase() + filters.country.slice(1)}`
    }
    return "Check a Property Before Renting"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Search Section */}
      <section className="pt-32 pb-16 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900">{getPageTitle()}</h1>
            {filters.country && (
              <p className="text-lg text-gray-600 mt-2">
                Showing results for {filters.city ? `${filters.city}, ` : ""}
                {filters.country}
                {filters.accommodation && ` - ${filters.accommodation}`}
              </p>
            )}
            {!filters.country && (
              <p className="text-lg text-gray-600 mt-2">
                Connect with verified local experts to check accommodations worldwide
              </p>
            )}
          </div>
          

          <CheckerSearchBox
            initialCountry={initialCountry}
            initialCity={initialCity}
            initialAccommodation={initialAccommodation}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Sidebar */}
            <div className="xl:w-1/4">
              <div className="hidden xl:block">
                <CheckerSidebar onFilterChange={handleFilterChange} />
              </div>

              {/* Mobile Sidebar */}
              <div className="xl:hidden">
                
                <button
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium mb-4"
                  onClick={() => {
                    const sidebar = document.getElementById("mobile-sidebar")
                    sidebar?.classList.toggle("hidden")
                  }}
                >
                  Show Filters
                </button>
                <div id="mobile-sidebar" className="hidden">
                  <CheckerSidebar onFilterChange={handleFilterChange} />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="xl:w-3/4">
                <h2 className="text-lg text-gray-600 mt-2 mb-2 font-bold">
                  Book a trusted local checker to verify your rental before you pay
                </h2>
                    <section className="py-4 lg:py-2">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        {/* ⭐ ADD THIS: SEO-friendly placeholder content when no results */}
                        {!isLoading && searchResults.length === 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 my-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                              No Checkers Available Yet in {getLocationString()}
                            </h2>
                            <div className="prose max-w-none text-gray-700">
                              <p className="mb-4">
                              { ` We're actively expanding our network of trusted local accommodation checkers 
                                to {filters.city || filters.country || 'this area'}. CheckerIst connects 
                                travelers with verified local experts who physically inspect rental properties 
                                before you book.`}
                              </p>
                              
                              <h3 className="text-xl font-semibold mt-6 mb-3">
                                Why Use CheckerIst in {filters.country || 'Your Destination'}?
                              </h3>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>Avoid rental scams and fake listings</li>
                                <li>Get real photos and videos of the actual property</li>
                                <li>Verify amenities, cleanliness, and safety before paying</li>
                                <li>Save money by avoiding disappointing accommodations</li>
                              </ul>

                              <h3 className="text-xl font-semibold mt-6 mb-3">
                                Interested in Becoming a Checker?
                              </h3>
                              <p>
                                Are you a local in {filters.city || filters.country || 'this area'}? 
                                Join our network and earn money by helping travelers verify accommodations.
                              </p>
                              <a 
                                href="/become-checker" 
                                className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                              >
                                Become a Checker
                              </a>

                              <h3 className="text-xl font-semibold mt-8 mb-3">
                                How CheckerIst Works
                              </h3>
                              <ol className="list-decimal pl-6 space-y-2">
                                <li>{`Find a rental property you're interested in`}</li>
                                <li>Book a local checker through our platform</li>
                                <li>Receive detailed inspection report with photos/videos</li>
                                <li>Make an informed decision before committing</li>
                              </ol>

                              <div className="bg-white p-6 rounded-lg mt-6 border border-gray-200">
                                <h4 className="font-semibold mb-2">Get Notified</h4>
                                <p className="text-sm mb-4">
                                   we&apos;ll email you when checkers become available in {getLocationString()}
                                </p>
                                {/* Add email signup form here */}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ... rest of existing code ... */}
                      </div>
                    </section>
              {!isLoading && <CheckerTopFilter totalResults={totalResults} location={getLocationString()} />}

              <div className="mt-8">
                {isLoading ? <LoadingComponent /> : <CheckerResults checkers={searchResults} />}
              </div>

              {!isLoading && searchResults.length > 0 && (
                <CheckerPagination
                  totalResults={totalResults}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
