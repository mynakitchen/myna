const PUBLIC_URL = process.env.PUBLIC_URL || '';

const blogPosts = [
  {
    slug: 'seasonal-menu-planning',
    title: 'How We Plan Seasonal Menus',
    description:
      'Explore how our chefs collaborate with local farmers to design balanced menus that celebrate seasonal produce while keeping weekday cooking effortless.',
    date: 'October 2025',
    readTime: '4 min read',
    category: 'Behind the Scenes',
    heroImage: `${PUBLIC_URL}/images/gallery/seasonal-veg-spread.webp`,
    sections: [
      {
        heading: 'Listening to the Fields',
        paragraphs: [
          'Every new menu cycle starts with quick calls to the farms that have been with us since the beginning. We ask what is thriving, which crops are at their sweetest, and what the growers are excited about.',
          'Once we have a shortlist, the culinary team experiments with flavour pairings that feel familiar yet surprising. We lean into warming spices when the evenings get cooler and lighter masalas when summer is in full swing.'
        ]
      },
      {
        heading: 'Balancing Comfort and Novelty',
        paragraphs: [
          'Subscribers rely on Myna for staples they can count on, so each seasonal drop keeps beloved dishes while rotating in two or three chef specials.',
          'Before finalising the plan we host a tasting evening with our nutrition lead, a few long-time customers, and the farm partners who grew the ingredients. Their notes shape the final tweaks.'
        ]
      },
      {
        heading: 'Keeping Weeknights Effortless',
        paragraphs: [
          'Even with seasonal menus, convenience stays at the centre. We test reheating instructions, ensure gravies stay silky the next day, and pack smartly so dinners go from fridge to plate in under ten minutes.',
          'If you ever wonder how your Tuesday curry feels so in-season, it is because a dozen people obsessed over the details before it reached your doorstep.'
        ]
      }
    ],
    takeaway: [
      'Seasonal menus begin with farm conversations, not spreadsheets.',
      'Feedback loops with customers guide every flavour tweak.',
      'Convenience remains the north star for the final plate.'
    ]
  },
  {
    slug: 'customer-favorites',
    title: '5 Customer Favourites for Busy Workweeks',
    description:
      'From hearty dals to protein-packed bowls, discover the dishes Myna subscribers reorder the most—and the tweaks we offer to suit every palate.',
    date: 'September 2025',
    readTime: '3 min read',
    category: 'Top Picks',
    heroImage: `${PUBLIC_URL}/images/gallery/comfort-meal-box.webp`,
    sections: [
      {
        heading: 'Tamarind Dal with Millet Rotis',
        paragraphs: [
          'Lightly sour, gently spiced, and surprisingly high in protein—this dal is our Monday night bestseller. We slow cook it for five hours and finish with roasted garlic oil.',
          'Gluten-free rotis are available on request, and we tuck in a crunchy slaw so the meal stays exciting through the week.'
        ]
      },
      {
        heading: 'Smoked Paneer Pepper Fry',
        paragraphs: [
          'Customers love how this dish can double as a snack or a main. We marinate paneer in a house-made pepper blend, then smoke it over coconut husk for a subtle coastal note.',
          'Pair it with steamed rice or toss leftovers into a wrap—the versatility is why it has near-perfect ratings.'
        ]
      },
      {
        heading: 'Midweek Wellness Bowls',
        paragraphs: [
          'Our nutrition team tops red rice with roasted vegetables, sesame crunch, and a citrus dressing to brighten long afternoons.',
          'Subscribers can choose between grilled tofu, chickpea patties, or lemon fish to match their protein goals without sacrificing flavour.'
        ]
      }
    ],
    takeaway: [
      'Comfort and adaptability keep these favourites on rotation.',
      'Each dish has at least one tweakable element for dietary needs.',
      'Small texture contrasts—like slaws and seeds—make reheats feel fresh.'
    ]
  },
  {
    slug: 'sustainability-at-myna',
    title: 'Sustainability at Myna Kitchen',
    description:
      'A look at the packaging swaps, delivery optimisations, and sourcing choices that help us serve great food with a lighter footprint.',
    date: 'August 2025',
    readTime: '5 min read',
    category: 'Sustainability',
    heroImage: `${PUBLIC_URL}/images/gallery/chefs-dinner-curation.webp`,
    sections: [
      {
        heading: 'Packaging with Purpose',
        paragraphs: [
          'Earlier this year we switched to sugarcane bagasse boxes that break down in home compost bins. The lids lock tight so curries stay put without extra plastic film.',
          'Reusables are part of our pilot too—office subscribers in Chennai receive stackable tiffins collected during the next delivery.'
        ]
      },
      {
        heading: 'Mindful Logistics',
        paragraphs: [
          'We re-route vans weekly using live subscriber data to avoid half-empty trips. It keeps meals on time and lowers emissions by nearly 18% compared to last year.',
          'Ice packs now rotate between customers; we sanitise and reuse them up to 40 times before recycling the shells.'
        ]
      },
      {
        heading: 'Partnering with Responsible Farms',
        paragraphs: [
          'Over 70% of our produce is sourced from farms practicing natural pest control. We pay a seasonal premium to keep their soil programmes sustainable.',
          'When harvests fall short we prioritise transparency, letting subscribers know which dish is affected and offering alternates rather than shipping imports.'
        ]
      }
    ],
    takeaway: [
      'Compostable packaging and reusables co-exist across our menu.',
      'Smart routing keeps deliveries punctual and carbon-light.',
      'Direct grower relationships help us stay honest about supply.'
    ]
  },
  {
    slug: 'nutrition-philosophy',
    title: 'Our Nutrition Philosophy',
    description:
      'Learn how we balance comfort, nostalgia, and nutrition so weekday meals feel indulgent yet energising—and why we believe in mindful portions.',
    date: 'July 2025',
    readTime: '6 min read',
    category: 'Wellness',
    heroImage: `${PUBLIC_URL}/images/gallery/protein-power-bowl.webp`,
    sections: [
      {
        heading: 'Built Around Everyday Energy',
        paragraphs: [
          'Our menus aim to power commutes, meetings, and evening workouts without the mid-afternoon slump. That means slow carbs, vibrant vegetables, and fats that satisfy without weighing you down.',
          'We see nutrition as a rhythm—heavy meals give way to lighter plates, and snacks are intentional rather than guilt-driven.'
        ]
      },
      {
        heading: 'Inspired by Familiar Flavours',
        paragraphs: [
          'Healthy does not mean bland. We lean on heritage recipes, using techniques like tempering and slow roasting to coax flavour from whole ingredients.',
          'When we lighten a dish we replace, never remove: cashew yogurt instead of cream, millet dosas in place of refined flour.'
        ]
      },
      {
        heading: 'Portions with Purpose',
        paragraphs: [
          'Our nutrition team reviews macros for each menu cycle, then plates each dish so proteins, fibre, and carbs stay balanced across the week.',
          'Portion cues on the packaging help you split the meal if needed, and our app details reheating tips so nutrients stay intact.'
        ]
      }
    ],
    takeaway: [
      'Meals are designed for steady energy, not quick spikes.',
      'Flavour-first healthy cooking keeps nostalgia on the plate.',
      'Portion guidance helps subscribers customise every box.'
    ]
  }
];

export const getBlogPostBySlug = (slug) =>
  blogPosts.find((post) => post.slug === slug);

export default blogPosts;

