/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const PRODUCTS: Product[] = [
  // --- ELECTRONICS ---
  {
    id: 'elec-1',
    name: 'Horizon Ultra 14 Laptop',
    description: 'M3 Max Chip, 32GB RAM, 1TB SSD, Space Grey Professional Edition. Featuring Liquid Retina XDR display, advanced cooling, and up to 22 hours of battery life.',
    category: 'electronics',
    subCategory: 'laptops',
    price: 1899.99,
    listPrice: 2199.99,
    rating: 4.9,
    reviewsCount: 142,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDZLdqe6qFrJ9RpRnUod2XTGHWdrpLdeNJBW11D77oDt-mMQyQSL47cFG4DDthbW9rmKVGSu1qwZNQ7cIQJ-3XXe5UhGSm8cIUD7bkHjQBosgJ1ATwAJDj8qLL1gRogdJn8Gqw9YjHGt-4MCzCq3kb1SJjEto4C2Jx4JLAyJfNXDM11QbfZaZc9v6_FTFIsvBtdmVYr2lckoNicWd0NpKJ_5heVGb4BJXwoOf_vKhgYsON3uKhIBzNz4NqKBqiiQW0Ju3eu7QqaRlN',
    isBestSeller: true,
    savePercent: 14,
    brand: 'Horizon',
    colors: ['Space Grey', 'Silver'],
    tags: ['M3 Max', 'Retina', 'Workstation']
  },
  {
    id: 'elec-2',
    name: 'Nexus Pro Phone 15',
    description: '256GB, Titanium Black, Global Unlocked with advanced AI Camera. Ultra-fast Snapdragon 8 Gen 3, dynamic 120Hz LTPO display, and 100W supercharging.',
    category: 'electronics',
    subCategory: 'phones',
    price: 999.00,
    listPrice: 1099.00,
    rating: 4.8,
    reviewsCount: 318,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF3WoU6hd_5RYgQAlA8iH90tcW02tD2uF0SEfUHyHxu-v3tWoV9uKhgH3RDAGm__zpCTA366amymAIybs-fG7EklDXkqHSrWXUp85qiVRscxoFCtKjrJdxAs2mrWjfOlL0lJJjOJJs7ZeU3WjbKy1l-uaf_OBZQd_LXWCF-yxCtbhIIILGoFWIG82mXQaXLIPUv7vmPxN6dpDS3_VlY-ENF-keeo9Dw3UvCtqjZb7Ms8zOGUsmzo5ydtLKTBCRuxj5cXhOwye8Qc1J',
    savePercent: 9,
    brand: 'Nexus',
    colors: ['Titanium Black', 'Natural Titanium', 'Titanium White'],
    tags: ['AI Camera', 'Snapdragon', '5G']
  },
  {
    id: 'elec-3',
    name: 'SonicWave X700 Headphones',
    description: 'Noise Cancelling Headphones with 40-hour Battery Life and Deep Bass. Premium memory foam earcups, active ambient aware, and crystal-clear voice pick-up.',
    category: 'electronics',
    subCategory: 'headphones',
    price: 349.95,
    listPrice: 399.95,
    rating: 4.7,
    reviewsCount: 89,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNVm3g8OwZA2e9RB1tZtQiJEl2vKD_cCG2V4siKyEinYUMkexAQcGhYMmwQU_IZcf9fow3uEPU94kOWp3uZ6lLkgb5S_7omjdKA1oRjt_DNNbXVshhHPtCC3EfeBQYuN7vh980niZHLMtcUUXkdna0oLZ7HOHCp32ZLuLITupmUTlle9K1aYRQ3dfPja5jGSC1TBXbnFsV9ukaLqUH7QERzNXDHSIpL6_36lEYYfeQhzsaErAllUDIkdTy1SjU3u4qMZNYLqjvtBzH',
    isBestSeller: true,
    savePercent: 12,
    brand: 'SonicWave',
    colors: ['Charcoal Black', 'Arctic White'],
    tags: ['ANC', 'Deep Bass', 'Bluetooth 5.3']
  },
  {
    id: 'elec-4',
    name: 'TabPro Max 11',
    description: '128GB, Wi-Fi 6E, Liquid Retina Display, Silver Edition. High-precision stylus compatibility, ultra-responsive refresh rate, and octa-core processor.',
    category: 'electronics',
    subCategory: 'tablets',
    price: 749.00,
    listPrice: 799.00,
    rating: 4.6,
    reviewsCount: 205,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_hM7ScJKcJgmJarZuT03seXjpbsQ0QRMnhwMAMGtCyedUMpmUZdSsXxooNqj01cq3qpmfDqAPsWLc_Oz2gQZUarsfvXyr0z2dVLNG8Sw2Z2h1xQz54dAkJMqfbhKb5jZsawAm77JdOdFSNXccqvOTHQyydBJRY-3RBjfrNmMqE4H_pnmjxlMfNg5ag9arT0mGW3eANRvuHfW04IaiBUBifmNxNDlEigKze6kVrrRWRNbr3mtZ1TwyLxES1O9Hzds78QLn0HMe7Vyu',
    brand: 'TabPro',
    colors: ['Silver', 'Graphite'],
    tags: ['Wi-Fi 6E', 'Stylus', 'Retina']
  },
  {
    id: 'elec-5',
    name: 'Lumix G95 Digital Camera',
    description: 'Professional Mirrorless Camera with 12-60mm Lens Kit. 4K live crop video recording, 5-axis dual image stabilization, and rugged weather-sealed construction.',
    category: 'electronics',
    subCategory: 'cameras',
    price: 797.99,
    listPrice: 899.99,
    rating: 4.8,
    reviewsCount: 63,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEWoZpfhmM5vWcCOvdBqWhv-aqUdRpVIgJ-4g4rtLRLYZF-mmsjKaYB7bbWO5sG9IfTaI95T3G15FQm0mrb1NO8x1tQLs6t8gksSFIxqH7EAZUjeABu5dLCiFXlEV41bOjMkesIPIVolpcnaDbZK00kwG6ShHom7_7NJ0kYMH2B9ynipRexPpnJr8Y6N7O0q-JLRlS71N6_VNOM7ftDQOlcP1a0Rchekrk9CivJsraGbRFchuteilh_U343A5610HOzRYYRHE__qdP',
    savePercent: 11,
    brand: 'Lumix',
    tags: ['4K Video', 'Mirrorless', 'Stabilization']
  },
  {
    id: 'elec-6',
    name: 'Premium Wireless Over-Ear Headphones',
    description: 'Studio-quality wireless audio featuring hybrid active noise cancellation, smart multi-point pairing, and plush ergonomic earcups for long wearing comfort.',
    category: 'electronics',
    subCategory: 'headphones',
    price: 149.00,
    listPrice: 199.00,
    rating: 4.5,
    reviewsCount: 154,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt5fNDqqnhCBJX67oLFPreIQknYYTdxiJvnEe20zOKmVGMlzYd1l7edRU6-uaS4-WCjB9mNxplglMCYizxi7Xf6iYLDBkeG6YjDn3qAvjto605CgUkUXG1pAoLbgFXc2Xjws0FIlgHXjp-aZIy3hUbOuMhcDI8WohSeUP2f4AOUDNd8h2-tKkIlO4JAgSHMLDjoSKQI44Wybm-662gj88xBw11zOqDXmIqI24KlyEkPIlJgTLnGDQTWmQO4pWNji4B8AkOJkusBKDW',
    brand: 'Acoustic',
    colors: ['Jet Black', 'Cognac Brown'],
    tags: ['Studio', 'Wireless', 'ANC']
  },

  // --- FASHION ---
  {
    id: 'fash-1',
    name: 'Essential Linen Midi Dress',
    description: 'Crafted from sustainable European linen. Relaxed elegant fit with pockets, adjustable waist sash, and shell buttons. Breathable, breezy summer perfection.',
    category: 'fashion',
    subCategory: 'dresses',
    price: 89.00,
    listPrice: 99.00,
    rating: 4.6,
    reviewsCount: 74,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJOtcqy53Zq6P6l6o_gQbmD_Lsv0Zw_Z8uTgg8_anlh7AaLlMd72QOhPvi_gyuY9GJ6BUkyzxFByrWawPXZMNyhSpKbGqF6aczkJh2TX2Mr23QPX1X04TzI3N7TqiksTzoHxtX2yxmgP0GCnWCb1tUCKim3h3Lv_An8p3OXIupAKVq3v-1MNGJTXOY2lSzDFeuC_GrN5xSBzRJn5yDOTurCtuyMcDnz2VIuNY42-Z5I70VSsZdt2fvUv1lAS-7edg6_Kdia5tSVF52',
    isBestSeller: true,
    brand: 'Aura',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Oatmeal', 'Sage Green', 'Navy Blue'],
    isSustainable: true,
    tags: ['Linen', 'Summer Essentials', 'Sustainable']
  },
  {
    id: 'fash-2',
    name: 'Classic Oxford Button-Down Shirt',
    description: '100% fine cotton yarn dyed Oxford fabric. Durable side-seam detailing, tailored silhouette, and double-button barrel cuffs. Looks great tucked or untucked.',
    category: 'fashion',
    subCategory: 'shirts',
    price: 55.00,
    listPrice: 65.00,
    rating: 4.4,
    reviewsCount: 112,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD-ZfXD6f7l-JOChYW3y337CC1h9aqLK74rnQHvSyBLqzk99kqT97ayme67jg892QvrED7x7M8j_n1cypKI7dNeqBoDlCBxbqpbFHh3-w34KesX0VZldLYt1u3GeokksBi9k_aThwArkDyjHZwmijZVg2Bvff4y2fpxjHz7jMRZVHoXj7MVxf7UrKaOTly3ZpC8jOBMmrjbdsSqU6pcOofKm2GBGzXIe5SJQutML6WfGzm0J2uwmpbBqHE2LXcqHYaNtQU5TYLAsC5',
    brand: 'Aura',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Light Blue', 'Classic White'],
    tags: ['Cotton', 'Smart Casual']
  },
  {
    id: 'fash-3',
    name: 'Coastal Straw Fedora',
    description: 'Woven hand-blocked paper straw. Dynamic ribbon band accent with interior adjustable sweatband. Offers UPF 50+ maximum sun protection with lightweight packable design.',
    category: 'fashion',
    subCategory: 'accessories',
    price: 42.00,
    listPrice: 48.00,
    rating: 4.7,
    reviewsCount: 45,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALZsOI1M0TMClGzCV0dzdJSnO1iPLpPmtsGz7QT3nD2X60neAkGkBigPajWOx7cJYCtEMeKDWgZbTXw4uFbOeirii00VwNS0nUlxsZhnntTYPHKjJLRsjxAsx4etU_x5Mxkvlf5h70E3ZWQXq9FKbo2kpX17iSf8BjhSYlfFkUFaMzpLewWXH7uoydP6NP6jD3nLX4qppUdIhDkG0fPK_UmpHZeE9e_hMLasKw1Cquu5KByc7mpn1QY54JZPl4-TAhztNJsxWkzn_Y',
    brand: 'Coastal Co.',
    sizes: ['One Size'],
    colors: ['Natural Tan'],
    tags: ['UPF 50+', 'Packable', 'Fedora']
  },
  {
    id: 'fash-4',
    name: 'Artisan Woven Leather Sandals',
    description: 'Genuinely soft hand-woven leather upper, natural cork contoured footbed that molds to your unique arch over time. Lightweight EVA flexible outsole.',
    category: 'fashion',
    subCategory: 'shoes',
    price: 120.00,
    listPrice: 139.00,
    rating: 4.8,
    reviewsCount: 96,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6VR5PVFamXmSb_osQhpN3Puh0Nfi-0bNPSFgluA_iyF-DP6c1Vzp1eVRz3sz8Kc_fyuR4gxFH6IedLWr1fPrMTmLHSCVl0349jfp5emQQ4IV4f9OqqhDIVhr9s3HOMQXZ5ZiqcDCFKbvQvZkOeMhi31d8_YSe_qmjS06z07ivMx_aXGE4GXEbgYsJ1U0VpA4Lfwri3CgB9C9UyyIlbqvaTdnrwwyY6Aa6GWrO7ICfv0NgjO65UGEF1XtUax5rgoUJ4r9lHs0BL8OZ',
    isBestSeller: true,
    brand: 'Coastal Co.',
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Tan Leather', 'Cognac'],
    tags: ['Handcrafted', 'Leather', 'Cork Footbed']
  },

  // --- BEAUTY & CARE ---
  {
    id: 'beau-1',
    name: 'Advanced Retinol Rejuvenating Serum',
    description: 'Time-release 1% pure encapsulated Retinol, Niacinamide, and hydrating Hyaluronic Acid. Gently accelerates cellular turnover, reduces fine lines, and promotes skin clarity.',
    category: 'beauty',
    subCategory: 'serums',
    price: 54.99,
    listPrice: 65.00,
    rating: 4.9,
    reviewsCount: 184,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeEcPuSn5UtDChyNaNHZsxL8P1kfVIs-LmGNyLxGOlP4vRWfcR09rSwGKFfInIjTyrvhZAwLlpTPUMiEH2WFvkpIYhb8JQ5GSdTH-9xWn5xRJGtBul2SNZX3sSYT_q4xCZK11fZ4hQnoAPIF9KccdNzS8vEY9GkO0dFwfy-xO0I8MKiTXIFlgh7rtN_MGCSGZsaIeESqgWPdPJZ7u1BzgwaQobIap6JTOArI_cR0do2WtVg7qTM_vRVUuJwktF9bTrfDrlD9dWcf_Y',
    isBestSeller: true,
    brand: 'Lumiere',
    tags: ['Anti-Aging', 'Retinol', 'Vegan']
  },
  {
    id: 'beau-2',
    name: 'Velvet Matte Lip Kit Set',
    description: 'Liquid Matte Lipstick paired with high-precision matching Lip Liner. Transfer-proof, 12-hour comfortable wear saturated with natural moisture oils.',
    category: 'beauty',
    subCategory: 'makeup',
    price: 29.00,
    listPrice: 34.00,
    rating: 4.5,
    reviewsCount: 78,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm2oAP8JP5yHQdgidZiRxWMLayUGsVNsUZfKivOt7dcYp7D7Xt0o7uuxoCD6MM_maCtIbpIlQ3OEgaAplPcboMIApFLqDD3E6i3s6Qe0MUUyMdu4BrmROCj-vKtFx1tcvPfVaTnnbAPiMhzMhOV79sLf3aOa9i_AcDFd8vVn4sEM8TZTf48-vzlYkyNTdwWfd8tQFGyAoqr_kxpyrNVb1ra9IniYCbbSJMQ9U3M0R2JLW27W37Y-z6hTwBZKxHTHWUlI9UE_a84T4f',
    brand: 'Aura',
    colors: ['Dusty Rose', 'Deep Velvet', 'Nude Charm'],
    tags: ['Longwear', 'Matte', 'Waterproof']
  },
  {
    id: 'beau-3',
    name: "L'Essence de Fleur Eau de Parfum",
    description: 'A sophisticated harmony of French Jasmine, Velvet Rose, and creamy Sandalwood. Hand-selected botanical extracts aged to perfect longevity.',
    category: 'beauty',
    subCategory: 'perfumes',
    price: 85.00,
    listPrice: 95.00,
    rating: 4.7,
    reviewsCount: 56,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4s_UWfYby3EwDv_6VUIr80B48YEt0FILpDCtPAO_6Lifam8ozWN7LQjHci8IgewUuh6i4XzaTxcPzgoyGViyfdGR8fS3CZ6Vv0OGXanqY6ut1jfLQ9o6WEF_oUM9B5BkZWvWq4-KJx03e0neb5yPagubnD7kZTwYDDJ-vCMnKaDyno896jqLX8yN0R3b75voI3oOWyNOS3wE8Q7rBmOdphevAvZia_iU0UUK2RSSqCXQFjJDpK5LlhaGL4rnjVV2qoet4QTQQtTQg',
    brand: 'Lumiere',
    isLimitedEdition: true,
    tags: ['Floral', 'Eau de Parfum', 'Artisan']
  },
  {
    id: 'beau-4',
    name: 'Daily Balance Skin Care Trio',
    description: 'Complete 3-step routine: Purifying Amino Gel Cleanser, Vitamin C Brightening Essence, and Hydrating Moisture Cloud Cream. Dermatologist certified.',
    category: 'beauty',
    subCategory: 'skincare',
    price: 64.00,
    listPrice: 79.00,
    rating: 4.8,
    reviewsCount: 139,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUqw8Ru7h1xou3Y3mZ4HVxr2v2WdMm6CD6-8cPx5Vq4yBMKLdob36RbsqCmnyNbt9-RtFwABBlRJ0lB5bfVlyL2JEII22ctNRlFO5m71wcTT8rve3PKuOWIcihoFoWobAB9ktP30VjNPS73jjRkQxX2Np2YO522RT7iz-VjM4dhn2YgUfPZTh0lOVrLXojk8MSIuq16tR_XafhJAFyO55Zj9kieW3xRIXAK0-dwFBkK4Kd4uvMVGEGzSUxM331H-TuCOdr0BcGJ2LE',
    isBestSeller: true,
    brand: 'Lumiere',
    tags: ['Dermatologist Tested', 'Gift Set', 'Brightening']
  }
];

export const CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    tagline: 'Next-Gen Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_PykFakvG3e05DluDgWdgvb3r0kSVvgNHNDOOVSGRGI0MtO2C9MKjbQeQ5YQh8crbrK8etuO9fXn_2pRW40dScktpaKSpqkovP2_S_vcc3GzJbARl0S4xWZ8YACybiLZS5CM3XJxzAzwM2dZikFN6KBKmnHWlOX0SWNUR8n-fdURm5m0LBDNL_HwdqX9qZPHyUMAmIjs1lFDCJJBMdd3fx9H9CLYaxa7XRYnVXIbErcLZMBnSHLQUAeB2mcoVyXDwrNdUeZF1brOk'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    tagline: 'Summer Trends 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiGF3NbTSmeQZBzsHsNEl-WHmaklcnwn0j1qoucPcO6NuCDMsarfhNe7S4uEe6CeOyd13DmdtvAoeQCTfjEJkdSKOQXpRoxetTiC4mvF_r1dkg0VqAK8CUz5WMV3fxXysc1Vld1gc5ZIriRIVPRHQcskKN_Z3A2AVt75c82s_qWeMkzAZLV_8285C36jP4S0rr6lhpPxWPXKNJgrn__KZ97vktTN3l6JSWLPIgfZQ9JrY5R9dm2dJlTMdvzULhQ03F6asdopzcSe3M'
  },
  {
    id: 'beauty',
    name: 'Beauty & Care',
    tagline: 'Eco-conscious Glow',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlg1hegTn6y-_oe01Vdb9Sj3_EcPIpbkijpt5YNI-uyn8LEF7JAHA48ABMK2hvedM5Fyb3mszFleQCaV5y9zsKVHgsvNaEODVLUdIeiFdSxskpolVhwcJo6HXYru71qNRuvn4l08H3sS-o7eXTdubzoD0rT2VOhNUa4kgTZspfm6JSGHyh9UhNde3B_7eDH9mHUtVuI4MIEO3tm5IVByKk7Tw19kc4zg3JZlYRVwSv7LKKKKm3CBIz38_3cc0krVM4cx-nHNf2ZrVI'
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    tagline: 'Elevated Spaces',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6IR6b4S6-wwK1jotShAOUdOu4gz87Xh3Mp0qonRFpve9crImXQNnMbe5qtoheaEeAKsUIIEg8q3Eq2g-QuF7jTL6skCvJphJqD-s3esg5FCXTPECgZlKvRzF7Qnllxa_ndtwN9azDfwT0H0nAOgzdEfyYYntKqI5NjGL1Mrktt3h7BwWN5OzJbZ6ZTVIGdNHhDb5y0qk52Oj--U1C37a_m0LzoSEtIUxVhATVcmStZlf_gFFClGA_YmwJMfr0aq1ATFqPzV-fjYLW'
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    tagline: 'Imagination Unleashed',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdBYRYkI3C-a__UqBN_23vInlfGwEkuWQNxe2amBwnM8_IZTLavdVAJQ28G0QE2w5C7iIiH9PvA3FjceG2_4HxoAX6ndMq5m9zHY7Krl2ysaLsdX9gCq88EE1_9VnoYE11f7rKgpggrTcSO3cRy9zxcNk1pydLtab1g_L4wHGOmzsOAZKJBSC89LWKn1yslssIowvrKTH8wIqBcYJL_ONhFzFNeajVAH4qkPCGjYzsjbiSiYcupAWiurlzxHZkIEES-d2l4pMaDeun'
  },
  {
    id: 'pet',
    name: 'Pet Supplies',
    tagline: 'Happy Companions',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa5VzUNqVHNy915DAa8AERX_0Bk7o8D_eajqtiOIEec3otYgr3M4dff-wYqiJdhInccQEgGydo2oaBgfcbHW-MZaOK_V2QOO61tv9NfMkRgz8IrFJzutZVzdsi_f9BAMlMofFXusNFo5hfw00NTf-UUHh9tyXEe_66-AaegfkHtiO_0zYwC6fsRxYGZVs7mkWe2noEpH1T91BrBz_Qo2MUVTYo31qEVsFeiAmqj-xKHIRYfL2EHNt6j11P97QqFt8EuRu_uY26VBe6'
  }
];
