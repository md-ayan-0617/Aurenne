import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { journalArticles } from '../../data/journal';
import { products } from '../../data/products';
import { SafeImage } from '../../components/common/SafeImage';
import { useUiStore } from '../../store/useUiStore';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setActiveTheme } = useUiStore();

  const article = journalArticles.find((a) => a.slug === slug) || journalArticles[0];
  const nextArticle =
    journalArticles.find((a) => a.slug !== article.slug) || journalArticles[0];

  const referencedPiece = article.relatedPieceSlug
    ? products.find((p) => p.slug === article.relatedPieceSlug)
    : null;

  useEffect(() => {
    setActiveTheme('warm-white');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, setActiveTheme]);

  return (
    <div className="w-full bg-[#F8F5EF] text-[#111214] pt-32 pb-40 overflow-hidden">
      {/* ====================================================
          ARTICLE HEADER
          ==================================================== */}
      <article className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="max-w-[820px] mx-auto mb-16">
          <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.2em] text-[#98743F] mb-6">
            <span>{article.issueNumber}</span>
            <span>•</span>
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="font-['Newsreader'] text-[46px] sm:text-[68px] md:text-[84px] leading-[0.96] text-[#111214]">
            {article.title}
          </h1>

          <p className="font-['Newsreader'] italic text-[22px] md:text-[26px] text-[#58595C] mt-6 leading-snug">
            "{article.subtitle}"
          </p>

          <div className="pt-8 mt-8 border-t border-[#111214]/15 flex items-center justify-between font-mono text-[11px] text-[#777774]">
            <span>BY {article.author.toUpperCase()}</span>
            <span>{article.date}</span>
          </div>
        </div>

        {/* Hero Full Bleed Image */}
        <div className="w-full h-[540px] md:h-[720px] bg-[#EAE5DA] overflow-hidden mb-20 border border-[#111214]/10 shadow-2xl">
          <SafeImage
            src={article.heroImage}
            alt={article.title}
            luxuryLabel={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body (Max width 720px) */}
        <div className="max-w-[740px] mx-auto space-y-8 font-['Newsreader'] text-[21px] text-[#111214] leading-[1.8]">
          {article.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          {/* Pull Quote */}
          <div className="my-14 py-8 border-y-2 border-[#98743F]/40 text-center">
            <blockquote className="font-['Newsreader'] italic text-[32px] sm:text-[40px] text-[#98743F] leading-tight">
              "{article.pullQuote}"
            </blockquote>
          </div>

          {/* Secondary Editorial Image */}
          {article.secondaryImage && (
            <div className="my-14 aspect-[16/10] overflow-hidden bg-[#EAE5DA] border border-[#111214]/10 shadow-lg">
              <SafeImage
                src={article.secondaryImage}
                alt="Secondary editorial detail"
                luxuryLabel="Editorial Detail"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Referenced Piece Card */}
          {referencedPiece && (
            <div className="my-14 p-6 bg-[#EFEBE1] border border-[#111214]/10 flex flex-col sm:flex-row items-center gap-6 not-prose">
              <div className="w-24 h-28 bg-[#DFD9CE] overflow-hidden flex-shrink-0">
                <SafeImage
                  src={referencedPiece.images[0]}
                  alt={referencedPiece.name}
                  luxuryLabel={referencedPiece.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#98743F] block">
                  REFERENCED IN THIS ESSAY
                </span>
                <h4 className="font-['Bodoni_Moda'] text-[20px] text-[#111214] mt-0.5">
                  {referencedPiece.name}
                </h4>
                <p className="text-[12px] font-['Space_Grotesk'] text-[#58595C] line-clamp-1 mt-1">
                  {referencedPiece.description}
                </p>
              </div>
              <Link
                to={`/piece/${referencedPiece.slug}`}
                className="btn-luxury text-[11px] whitespace-nowrap text-[#111214]"
              >
                VIEW PIECE →
              </Link>
            </div>
          )}
        </div>

        {/* Next Story Banner */}
        <div className="max-w-[1280px] mx-auto mt-32 pt-16 border-t border-[#111214]/15">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#98743F] block mb-4">
            NEXT STORY →
          </span>
          <Link
            to={`/journal/${nextArticle.slug}`}
            className="group block flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4"
          >
            <h3 className="font-['Newsreader'] text-[36px] sm:text-[54px] text-[#111214] group-hover:text-[#98743F] transition-colors">
              {nextArticle.title}
            </h3>
            <span className="font-mono text-[12px] text-[#777774]">
              {nextArticle.readTime}
            </span>
          </Link>
        </div>
      </article>
    </div>
  );
};
